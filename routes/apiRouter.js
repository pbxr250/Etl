var express = require('express');
const router = express.Router();
const requestInfoController = require('../controllers/requestInfo.controller');
const pipelineController = require('../controllers/pipeline.controller');

/* GET users listing. */
router.get('/list', listHandler);
router.get('/pipelines', pipelinesHandler);
router.get('/test', testHandler);




async function listHandler(req, res, next) {
  try{
    const list = await requestInfoController.list(req.query);
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: list
    });
  } catch(error) {
    next(error);
  }
}

async function pipelinesHandler(req, res, next) {
  try{
    const list = await pipelineController.list(req.query);
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: list
    });
  } catch(error) {
    next(error);
  }
}

async function testHandler(req, res, next) {
  try{
    const query = {
      name: 'Pipe1',
      active: true,
      endpoints: ["/","/users"],
      parser: 'x=1+1;print(x)',
      destination: 'Mongo1'
    }

    const list = await pipelineController.add(query);
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: list
    });
  } catch(error) {
    next(error);
  }
}

module.exports = router;
