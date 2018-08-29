const logger = {
  log(level, ...args) {
    console.log(level, '-', ...args)
  },

  info(...args) {
    this.log('INFO', ...args)
  }
}

module.exports = logger
