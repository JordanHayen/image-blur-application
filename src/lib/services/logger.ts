import pino from "pino"

export default pino({
    browser: {
        serialize: true,
        asObject: true,
    }
})