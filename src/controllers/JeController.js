const Je = require('../models/Je');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const { promisify } = require('util');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const generateToken = (params = {}) => jwt.sign(params, authConfig.secretJe, {
  expiresIn: 86400, //um dia
});

module.exports = {
  async index(req, res) {
    try {
      const jes = await Je.findAll({
        include: { association: 'member' }
      });
      if (jes.length == 0)
        return res.status(404).json({ msg: 'NOT FOUND' });
      else {
        for (let i = 0; i < jes.length; i++) {
          jes[i].password = undefined;
          for (let j = 0; j < jes[i].member.length; j++)
            jes[i].member[j].password = undefined;
        }
        return res.status(200).json(jes);
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async store(req, res) {
    const { name, email, password, university, city, creationYear } = req.body;

    const hash = generateHash(password);

    try {
      if (req.file) {
        const { key } = req.file;
        const je = await Je.create({ name, email, password: hash, university, image: key, city, creationYear });
        je.password = undefined;
        return res.status(200).json({ je, token: generateToken({ id: je.id }) });
      }
      else {
        const je = await Je.create({ name, email, password: hash, university, city, creationYear });
        je.password = undefined;
        return res.status(200).json({ je, token: generateToken({ id: je.id }) });
      }
    } catch (error) {
      if (req.file) {
        const { key } = req.file;
        promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'public', 'uploads', 'je', key));
      }
      return res.status(400).json(error);
    }
  },

  async delete(req, res) {
    const { id } = req.body;
    try {
      const je = await Je.findByPk(id);
      if (je) {
        if (je.image)
          promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'public', 'uploads', 'je', je.image));
        je.destroy();
        return res.status(200).json({ msg: 'ok' });
      }
      else
        return res.status(404).json({ msg: 'NOT FOUND' });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async update(req, res) {
    const { id, name, university, city, creationYear } = req.body;

    try {
      const je = await Je.findByPk(id);
      if (je) {
        if (req.file) {
          const { key } = req.file;
          if (je.image)
            promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'public', 'uploads', 'je', je.image));
          je.update({
            name: name,
            university: university,
            image: key,
            city: city,
            creationYear: creationYear,
          });
        }
        else {
          je.update({
            name: name,
            university: university,
            city: city,
            creationYear: creationYear,
          });
        }
        je.password = undefined;
        return res.status(200).json(je);
      }
      else {
        if (req.file) {
          const { key } = req.file;
          promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'public', 'uploads', 'je', key));
        }
        return res.status(404).json({ msg: 'NOT FOUND' });
      }
    } catch (error) {
      if (req.file) {
        const { key } = req.file;
        promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'public', 'uploads', 'je', key));
      }
      return res.status(400).json(error);
    }
  },
};