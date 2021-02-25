
const requestInfo = require('../controllers/requestInfo.controller');

async function postRouter(req, res, next) {
    requestInfo.add(req);
    res.sendStatus(200);
};

module.exports = postRouter;
