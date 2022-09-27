const {
  listAll,
  addItem,
  getMessage,
  listMessage,
  getItem,
} = require('../controller');

const router = (app) => {
  app.get('/', listAll);
  app.get('/19110335/:id', getItem);
  app.post('/19110335/:id', addItem);
  app.get('/message/:id', getMessage);
  app.get('/message', listMessage);
};

module.exports = router;
