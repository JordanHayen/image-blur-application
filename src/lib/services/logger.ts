import pino from "pino"

// This method will be used to create the logger
// It takes in the Loggly customer token as a string
const createLogger = (logglyToken: string): pino.Logger => {
    //  This object contains the data needed to configure the logger
    const loggerConfig = {
        browser: {
            serialize: true,
            asObject: true,
            // A transmit is created to process that logs
            transmit: {
                send: function(level: pino.Level, logEvent: pino.LogEvent) {
                    // The fetch API is called to send the logs to the endpoint
                    fetch(`https://logs-01.loggly.com/inputs/${logglyToken}/tag/http/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(logEvent)
                    })
                }
            }
        }
    }

    // A logger with the above configurations is returned
    return pino(loggerConfig);
}

export default createLogger;