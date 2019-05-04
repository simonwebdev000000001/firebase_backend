const router = require('express').Router();
const firebase = require('firebase');
const SERVER_CODE = require('../../../server.codes');
const {
  User,
} = require('../../../models');


async function checkItem(req, res, next) {
  try {
    let item = await User.collection.doc(req.params.id).get();
    if (!item.exists) {
      res.json({
        error: {
          message: 'No item found!',
        },
        code: SERVER_CODE.ERROR_CODES.BAD_READ,
      });
    } else {
      req.item = item;
      next();
    }

  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_READ,
    });
  }
}

router.get('', function(req, res) {

  try {
    const {
      limit,
      startAt,
      orderBy,
      orderDir,
    } = req.query;
    User.collection
      .orderBy(orderBy || 'userId', orderDir || 'asc')
      .startAt(startAt || 0)
      .limit(limit ? parseInt(limit) : 10)
      .get()
      .then((snapshot) => {
        res.json(new User.Schema({}).toList(snapshot));
      }).catch((error) => res.status(SERVER_CODE.RESPONCE_STATUS.BAD_REQUEST).json(error));
  } catch (e) {
    res.status(SERVER_CODE.RESPONCE_STATUS.BAD_REQUEST).json({
      message: e.message,
      CODE: SERVER_CODE.ERROR_CODES.SYNTAX,
    });
  }
});
router.post('', async function(req, res) {
  try {
    if (!req.body.email) throw ('missing required fields');
    let user = new User.Schema(req.body);
    req.body.createdBy = req.user.uid;
    const createdItem = await User.collection.add(user.mapToCreate(req.body));
    user.id = createdItem.id;
    res.json(user.toJSON(true));
  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_CREATE,
    });
  }
});
router.put('/:id', checkItem, async function(req, res) {
  try {
    let user = new User.Schema(req.body);
    req.body.editedBy = req.user.uid;
    await User.collection.doc(req.params.id).set(user.mapToUpdate(req.body), {
      merge: true,
    });
    user.id = req.params.id;
    res.json(user.toJSON(true));
  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_UPDATE,
    });
  }
});
router.get('/:id', checkItem, async function(req, res) {
  try {

    const item = req.item.data();
    item.id = req.params.id;
    res.json((new User.Schema(item).toJSON(true)));
  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_READ,
    });
  }
});
router.delete('/:id', checkItem, async function(req, res) {
  try {
    await User.collection.doc(req.params.id).delete();
    res.json({
      message: 'Deteted',
    });
  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_DELETE,
    });
  }
});


module.exports = router;
