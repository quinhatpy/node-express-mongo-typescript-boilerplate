import chalk from 'chalk'
import Transport from 'winston-transport'

import { STYLES } from '@constants/logger'

import ConsoleLogger from './console'

const levelStyleMap: { [key: string]: chalk.Chalk } = {
  error: STYLES.ERROR,
  warn: STYLES.WARN,
  info: STYLES.INFO,
  verbose: STYLES.VERBOSE,
  debug: STYLES.DEBUG,
  silly: STYLES.SILLY,
}

export default class ConsoleLogTransport extends Transport {
  private logger = new ConsoleLogger()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(info: any, callback: { (): void }): void {
    const style = levelStyleMap[info.level as string] || STYLES.DEBUG
    const label =
      info?.consoleLoggerOptions?.label || (info.level as string).toUpperCase()
    const messages = [info.message]

    if (info.error) {
      messages.push(info.error)
    }

    this.logger.log(style, label, ...messages)
    callback()
  }
}
