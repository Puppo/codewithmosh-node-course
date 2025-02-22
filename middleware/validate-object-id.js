const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send('Invalid Object ID');
    }

    next();
}