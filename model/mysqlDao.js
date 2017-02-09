/**
 * Created by think on 2017/2/7.
 */
var mysql = require('mysql');
var log4js = require('log4js');
var logger = log4js.getLogger("mysql");
var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'av_db'
});
var dataDao = {}


dataDao.query = function (sql, param) {
    var promise = new Promise(function (resolve, reject) {
        connection.query(sql, param, function (error, results, fields) {
            if (!error) {
                resolve(results, fields);
            } else {
                logger.error(error);
                reject(error);
            }
        });
    });
    return promise;
}
dataDao.queryVideoList = function (pageIndex, pageSize) {
    var end = pageSize * pageIndex;
    var begin = pageSize * (pageIndex - 1);
    return dataDao.query('SELECT * FROM av_db.video_info limit ?, ?', [begin, end]);
}


module.exports = dataDao;