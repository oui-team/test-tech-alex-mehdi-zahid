import meow from 'meow';
import logger, { reportCriticalError } from './utils/Logger';
import OutputWritter, { DEFAULT_OUTPUT_FORMAT } from './utils/OutputWritter';
import DateChecker, { DATE_FORMAT } from './utils/DateChecker';
import GetTotalPower, {
  CMD_GET_TOTAL_POWER,
  CMD_GET_TOTAL_POWER_EXAMPLE,
} from './commands/GetTotalPower';

const OPTION_WITH_CONF = '-r dotenv/config';

function displayStartCommand(withConf?: string) {
  return `node ${withConf ? withConf + ' ' : ''}bin/index.js`;
}

const cli = meow(
  `
	Usage
	  $ ${displayStartCommand(OPTION_WITH_CONF)} <command>
      or with npm
   $ npm run start -- <command>

 where <command> is one of:
    ${CMD_GET_TOTAL_POWER} Get the total power available in the power plant(s).

	Options
	   --from, -f <date ${DATE_FORMAT}>    Start date (Required).
    --to, -t <date ${DATE_FORMAT}>      End date (Required).
    --format, -o <csv | json>       Output format (Default: ${DEFAULT_OUTPUT_FORMAT}).
    --help                          Print help.

	Examples
	  $ ${displayStartCommand(OPTION_WITH_CONF)} ${CMD_GET_TOTAL_POWER_EXAMPLE}
`,
  {
    flags: {
      from: {
        type: 'string',
        alias: 'f',
        isRequired: true,
      },
      to: {
        type: 'string',
        alias: 't',
        isRequired: true,
      },
      format: {
        type: 'string',
        alias: 'o',
        default: DEFAULT_OUTPUT_FORMAT,
      },
    },
  },
);

logger.info(`${cli.pkg.name} - version: ${cli.pkg.version}`);

process.on('uncaughtException', (e) => {
  reportCriticalError(e.message);
});

try {
  switch (cli.input[0]) {
    case CMD_GET_TOTAL_POWER:
      // We check the validity of the parameters as early as possible.
      // Because modules need to be the more independant as possible,
      // they also must check their inputs.
      DateChecker.checkInputDates(cli.flags.from, cli.flags.to);
      OutputWritter.checkFormatParameter(cli.flags.format);
      GetTotalPower.run(cli.flags.from, cli.flags.to, cli.flags.format);
      break;
    default:
      if (cli.input[0]) {
        logger.error(`The command '${cli.input[0]}' is invalid.`);
      } else {
        logger.error(`The command is missing.`);
      }
      logger.info(cli.help);
  }
} catch (err) {
  reportCriticalError(err.message);
}
