const router = require('express').Router();
const SERVER_CODE = require('../../../server.codes');
const {
  Tenant,
} = require('../../../models');


async function checkItem(req, res, next) {
  try {
    let item = await Tenant.collection.doc(req.params.id).get();
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
    Tenant.collection
      .orderBy(orderBy || 'tenantId', orderDir || 'asc')
      .startAt(startAt || 0)
      .limit(limit ? parseInt(limit) : 10)
      .get()
      .then((snapshot) => {
        res.json(new Tenant.Schema({}).toList(snapshot));
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
    let item = new Tenant.Schema(req.body);
    req.body.createdBy = req.user.uid;
    const createdItem = await Tenant.collection.add(item.mapToCreate(req.body));
    item.id = createdItem.id;
    res.json(item.toJSON(true));
  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_CREATE,
    });
  }
});
router.put('/:id', checkItem, async function(req, res) {
  try {
    let item = new Tenant.Schema(req.body);
    req.body.editedBy = req.user.uid;
    await Tenant.collection.doc(req.params.id).set(item.mapToUpdate(req.body), {
      merge: true,
    });
    item.id = req.params.id;
    res.json(item.toJSON(true));
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
    res.json((new Tenant.Schema(item).toJSON(true)));

  } catch (error) {
    res.json({
      error,
      code: SERVER_CODE.ERROR_CODES.BAD_READ,
    });
  }
});
router.delete('/:id', checkItem, async function(req, res) {
  try {
    await Tenant.collection.doc(req.params.id).delete();
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
