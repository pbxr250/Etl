const requestInfoController = {};
const requestInfo = require('../models/requestInfo.model');

requestInfoController.list = async (query) => {
    const { limit = "0", skip = "0" } = query;
    return requestInfo.list({ limit, skip });
};

requestInfoController.add = async (req) => {
    const reqInfo = new requestInfo({
        endpoint: req.originalUrl,
        body: JSON.stringify(req.body)
        })
    
    const doc = await reqInfo.save()
};

module.exports = requestInfoController;