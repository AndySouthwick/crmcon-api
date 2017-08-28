import debug from 'debug'

const err = debug('api:error')
err.error = console.error.bind(console)

const log = debug('api:log')
log.log = console.log.bind(console)

const info = debug('api:info')
info.info = console.info.bind(info)

export default {
    log: log,
    error: err,
    info: info
}