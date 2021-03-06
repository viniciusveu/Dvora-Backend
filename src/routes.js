const express = require("express");
const multer = require("multer");

const JeController = require('./controllers/JeController');
const MemberController = require('./controllers/MemberController');
const multerMiddleware = require('./middlewares/multer');
const LoginController = require('./controllers/LoginController');
const authJe = require('./middlewares/authJe');
const authMember = require('./middlewares/authMember');

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ ok: true });
});

routes.post('/login', LoginController.login);

routes.get('/jes', JeController.index);
routes.post('/jes/signup', multer(multerMiddleware).single('file'), JeController.store);
routes.delete('/jes/delete', authJe, JeController.delete);
routes.put('/jes/update', authJe, multer(multerMiddleware).single('file'), JeController.update);

routes.get('/jes/:jeId/members', MemberController.index);
routes.post('/jes/:jeId/members/signup', multer(multerMiddleware).single('file'), MemberController.store);
routes.delete('/jes/:jeId/members/delete', authMember, MemberController.delete);
routes.put('/jes/:jeId/members/update', authMember, multer(multerMiddleware).single('file'), MemberController.update);

module.exports = routes;