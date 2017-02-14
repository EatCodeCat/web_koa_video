/**
 * Created by think on 2017/2/7.
 */
var mysql = require('mysql');
var log4js = require('log4js');
var logger = log4js.getLogger("mysql");
var connection = mysql.createPool({
    connectionLimit: 10,
    host: '120.77.41.111',
    user: 'root',
    password: '123456',
    database: 'web_video_db'
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
dataDao.batch_query =function (querys) {
    return Promise.all(querys);
}
dataDao.queryVideoList = function (pageIndex, pageSize) {
    var end = pageSize * pageIndex;
    var begin = pageSize * (pageIndex - 1);
    return dataDao.query('SELECT * FROM video_info limit ?, ?', [begin, end]);
}
dataDao.getVideo = function (id) {
    return dataDao.query('SELECT * FROM video_info where id = ?', [id]);
}

dataDao.getVideoAndLis = function(pageIndex, pageSize, id){
    return dataDao.batch_query([dataDao.queryVideoList(pageIndex,pageSize), dataDao.getVideo(id)])
}

module.exports = dataDao;