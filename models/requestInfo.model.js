const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const RequestInfo = new Schema({
    endpoint: String,
    received: { type: Date, default: Date.now },
    body: String
}, { collection: 'requestInfo' });

//RequestInfo.plugin(mongoosePaginate);

RequestInfo.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

RequestInfo.statics = {
    list({ skip = "0", limit = "0" } = {}) {
        return this.find({})
        .lean()
        .select('-_id -__v')
        .sort({ received: 1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .exec()
    }
};


module.exports = mongoose.model("RequestInfo", RequestInfo);