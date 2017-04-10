const postsController = require('../controllers').posts;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/posts', postsController.create);
  app.get('/api/posts', postsController.list);
  app.get('/api/posts/:id', postsController.single);
  app.delete('/api/posts/:id', postsController.remove);
  app.put('/api/posts/:id', postsController.update);
};
