function findItem(items, id) {
  return items.find((item) => item.id === id);
}
const { mapGroup, myGroup } = require('../models/index');

const listAll = (req, res, next) => {
  try {
    return res.status(200).send(myGroup);
  } catch (err) {
    return next(err);
  }
};

const addItem = (req, res, next) => {
  try {
    const { id } = req.params;
    const isExist = findItem(myGroup, Number(id));
    if (mapGroup.has(Number(id)) && !isExist) {
      myGroup.push({ id: Number(id), name: mapGroup.get(Number(id)) });
      return res.status(200).send('Add item success!');
    }
    return res.status(400).send('Not valid');
  } catch (err) {
    return next(err);
  }
};

const getItem = (req, res, next) => {
  try {
    const { id } = req.params;
    if (mapGroup.has(Number(id))) {
      const result = { id: Number(id), name: mapGroup.get(Number(id)) };
      return res.status(200).send(result);
    }
    return res.status(404).send({ error: 'not valid' });
  } catch (err) {
    return next(err);
  }
};

const getMessage = (req, res, next) => {
  try {
    const { id } = req.params;
    if (mapGroup.has(Number(id))) {
      const result = `<html><body><ul><li> ${mapGroup.get(Number(id))}</li></ul></body></html>`;
      return res.status(200).send(result);
    }
    return res.status(404).send('Not valid');
  } catch (err) {
    return next(err);
  }
};

const listMessage = (req, res, next) => {
  try {
    const begin = '<html><body><ul>';
    const end = '</ul></body></html>';
    const result = myGroup.map((item) => `<li> ${item.name}</li>`);
    return res.status(200).send(begin + result.join('') + end);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  listAll,
  addItem,
  getItem,
  getMessage,
  listMessage,
};
