/**
 * Created by think on 2017/2/7.
 */

var dao = require('./mysqlDao');

page = {}

page.list = function(pageIndex, pageSize,cb){
    return dao.queryVideoList(pageIndex, pageSize).then(cb)
}
page.detail = function (pageIndex, pageSize,id, cb) {
    return dao.getVideoAndLis(pageIndex, pageSize, id).then(function(res){
        if(res.length >= 2)
            return cb(res[0], res[1][0])
        return cb({})
    });
}

module.exports  = page;