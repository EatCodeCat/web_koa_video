/**
 * Created by think on 2017/2/7.
 */

var dao = require('./mysqlDao');

page = {}

page.list = function(pageIndex, pageSize,cb){
    return dao.queryVideoList(pageIndex, pageSize).then(cb)
}

module.exports  = page;