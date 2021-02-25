const pipelineController = {};
const pipeline = require('../models/pipeline.model');

pipelineController.list = async (query) => {
    const { limit = "0", skip = "0" } = query;
    return pipeline.list({ limit, skip });
};

pipelineController.add = async (query) => {
    const pipe = new pipeline({
        name: query.name,
        active: query.active,
        endpoints: query.endpoints,
        parser: query.parser,
        destination: query.destination
    })
    
    const doc = await pipe.save()
};

module.exports = pipelineController;