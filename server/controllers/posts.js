const Post = require('../models').Post;
const sequelize = require('sequelize');

module.exports = {
  create(req, res) {
    if (req.body.title && req.body.content && req.body.type && req.body.typeLabel) {
      return Post
        .create({
          title: req.body.title,
          content: req.body.content,
          type: req.body.type,
          typeLabel: req.body.typeLabel,
          createdAt: new Date(),
          updatedAt: null,
        })
        .then(post => res.status(201).send(post))
        .catch(error => res.status(400).send(error));
    } else {
      throw res.status(400).send({message: "Bad request"})
    }
  },
  list(req, res) {
    return Post
      .all({ where: { type: req.query.type } })
      .then(posts => res.status(200).send(posts))
      .catch(error => res.status(400).send(error));
  },
  single(req, res) {
    return Post
      .findOne({ where: { id: req.params.id } })
      .then(post => res.status(200).send(post))
      .catch(error => res.status(400).send(error));
  },
  remove(req, res) {
    return Post
      .destroy({ where: { id: req.params.id }, individualHooks : true })
      .then(record => {
       if(record) {
         res.status(201)
       }
       else {
         res.status(404).json({message:"record not found"})
       }
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    if (req.body.title && req.body.content && req.body.typeLabel) {
      return Post
        .update({
          title: req.body.title,
          content: req.body.content,
          typeLabel: req.body.typeLabel,
          updatedAt: new Date()
        }, {
          where: {
            id: req.params.id
          }
        })
        .then(() => res.status(201).send({message: "Post has been updated!!!"}))
        .catch(error => res.status(400).send(error));
    } else {
      throw res.status(400).send({message: "Bad request"})
    }
  }
};
