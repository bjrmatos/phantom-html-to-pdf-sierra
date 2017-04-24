module.exports = function(options) {
    return new (require("./workers/phantomManager.js"))(options);
}

module.exports.PhantomManager = require("./workers/phantomManager.js");
module.exports.PhantomWorker = require("./workers/phantomWorker.js");
