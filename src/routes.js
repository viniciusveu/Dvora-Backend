const express = require("express");
const JeController = require('./controllers/JeController');
const MemberController = require('./controllers/MemberController');
const authMiddleware = require('./middlewares//auth');

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ ok: true });
});

routes.get('/jes', authMiddleware, JeController.index);
routes.post('/jes/signup', JeController.store);
routes.post('/jes/login', JeController.login);
routes.delete('/jes/delete', authMiddleware, JeController.delete);
routes.put('/jes/update', authMiddleware, JeController.update);

routes.get('/jes/:jeId/members', MemberController.index);
routes.post('/jes/:jeId/members/signup', MemberController.store);

module.exports = routes;