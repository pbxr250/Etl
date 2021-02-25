const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pipeline = new Schema({
    name: String,
    created: { type: Date, default: Date.now },
    active: Boolean,
    endpoints: [String],
    parser: String,
    destination: String
}, { collection: 'pipeline' });


Pipeline.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

   Pipeline.statics = {
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


module.exports = mongoose.model("Pipeline", Pipeline);