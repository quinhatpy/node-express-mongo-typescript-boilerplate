import chalk from 'chalk'

import { LogLabels, STYLES } from '@constants/logger'

const getTimeStampString = () => new Date(Date.now()).toISOString()

class ConsoleLogger {
  public log(
    style: chalk.Chalk,
    label: LogLabels | string,
    ...messages: any[]
  ): void {
    const finalMessage = `[${getTimeStampString()}] [${label}]`

    // eslint-disable-next-line no-console
    console.log(
      style(
        finalMessage,
        ...messages.map((item) => {
          if (item.stack) {
            return '\n' + item.stack
          } else if (item.message) {
            return item.message
          }

          return item
        }),
      ),
    )
  }

  public error(...messages: any[]): void {
    this.log(STYLES.ERROR, LogLabels.Error, ...messages)
  }

  public warn(...messages: any[]): void {
    this.log(STYLES.WARN, LogLabels.Warn, ...messages)
  }

  public info(...messages: any[]): void {
    this.log(STYLES.INFO, LogLabels.Info, ...messages)
  }

  public verbose(...messages: any[]): void {
    this.log(STYLES.VERBOSE, LogLabels.Verbose, ...messages)
  }

  public debug(...messages: any[]): void {
    this.log(STYLES.DEBUG, LogLabels.Debug, ...messages)
  }

  public silly(...messages: any[]): void {
    this.log(STYLES.SILLY, LogLabels.Silly, ...messages)
  }
}

export default ConsoleLogger
