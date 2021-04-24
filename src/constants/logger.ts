import chalk from 'chalk'

export const STYLES = {
  ERROR: chalk.bold.red,
  WARN: chalk.keyword('orange'),
  INFO: chalk.hex('#c4c64f'),
  VERBOSE: chalk.hex('#6435c9'),
  DEBUG: chalk.hex('#2185d0'),
  SILLY: chalk.hex('#21ba45'),
}

export enum LogLabels {
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO',
  Verbose = 'VERBOSE',
  Debug = 'DEBUG',
  Silly = 'SILLY',
}
