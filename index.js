const Helper = require('./js/lib/helper').Helper;
let helper = new Helper();

exports.themes = helper.getThemes(__dirname);