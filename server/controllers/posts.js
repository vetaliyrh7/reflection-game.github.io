const Post = require('../models').Post;

module.exports = {
  create(req, res) {
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
  },
  list(req, res) {
    return Post
      .all({ where: { type: req.query.type } })
      .then(posts => res.status(200).send(posts))
      .catch(error => res.status(400).send(error));
  },
};
