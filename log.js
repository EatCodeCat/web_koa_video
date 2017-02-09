/**
 * Created by think on 2017/2/7.
 */
const path = require('path')
const log4js = require('log4js')
const logDir = path.join(__dirname, 'logs')  //配置目标路径 logs

try {
    require('fs').mkdirSync(logDir)  //新建目录， ./logs
} catch (err) {
    if (err.code !== 'EEXIST') {
        console.error('Could not set up log directory, error was: ', err)
        process.exit(1)
    }
}
//根据log 配置文件(log4js.json)配置日志文件
log4js.configure(path.join(__dirname, 'log4js.json'), {cwd: logDir})

const logger = log4js.getLogger('startup')
//输入日志
logger.info('logs config finished!')

function log(app) {
    app.use(function (ctx, next) {
        var logger = log4js.getLogger('http')
        logger.info(ctx.url)
        return next();
    })

    app.on('error', function (err) {
        var logger = log4js.getLogger('error')
        logger.error('server error', err);
    });

    return log4js;
}

module.exports = log