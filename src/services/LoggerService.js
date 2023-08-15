import winston from 'winston';


const customLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  };




export default class LoggerService {
    constructor(env) {
        this.logger = this.createLogger(env);       
          
    }
    createLogger = (env) => {
        switch(env){
            case "dev":
                return winston.createLogger({
                    levels: customLevels,
                    transports: [
                        new winston.transports.Console({level:"debug"})
                    ]
                })
            case "prod":
                return winston.createLogger({
                    levels: customLevels,
                    transports: [
                        new winston.transports.Console({level:"info"}),
                        new winston.transports.File({level:"error",filename:'./errors.log'})
                    ]
                })            
        }
    }
}