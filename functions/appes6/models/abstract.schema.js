const moment = require('moment');
const dateFormat = 'DD/MM/YYYY HH:MM:SS';
const firebase = require('firebase');

class AsbtractSchema {
  constructor(data) {
    if (typeof data.id !== 'undefined') this.id = data.id;
    this.tenantId = data.tenantId || '';
    this.userId = data.userId || '';
    this.portalId = data.portalId || '';
    this.customerId = data.customerId || '';
    this.type = data.type || '';
    this.category = data.category || '';
    this.keywords = data.keywords || '';
    this.status = data.status || '';
    this.sysState = data.sysState || '';
    this.dateCreated = this._timestamp(this.dateCreated);
    this.dateEdited = this._timestamp(this.dateEdited);
    this.createdBy = data.createdBy || '';
    this.editedBy = data.editedBy || '';
  }

  _timestamp(date) {
    // return date;
    // return new firebase.firestore.Timestamp();
    return date ? firebase.firestore.FieldValue.serverTimestamp().fromDate(date) : firebase.firestore.FieldValue.serverTimestamp();
    // return date || Date.now();
    // return date && moment(date).isValid() ? moment(date).format(dateFormat) : moment().format(dateFormat)
  }

  toList(list) {
    const data = [];
    list.forEach((el) => {
      const item = (new this.constructor(el.data())).toJSON(true);
      item.id = el.id;
      data.push(item);
    });
    return {
      data,
    };
  }

  mapToUpdate(data) {
    let res = {};
    const exludeTypes = ['function'];
    const exclude = ['id', 'dateCreated', 'dateEdited'];
    for (let key in this) {
      if (
        !~exludeTypes.indexOf(typeof this[key]) &&
        typeof data[key] !== undefined &&
        typeof data[key] !== 'undefined' &&
        this.hasOwnProperty(key) &&
        !~exclude.indexOf(key)
      ) {
        res[key] = data[key];
      }
    }
    res.dateEdited = firebase.firestore.FieldValue.serverTimestamp();
    return res;
  }

  mapToCreate(data) {
    let res = {};
    const exludeTypes = ['function'];
    const exclude = ['id', 'dateCreated', 'dateEdited', '__keys__'];
    for (let key in this) {
      if (
        this.hasOwnProperty(key) &&
        typeof data[key] !== 'undefined' &&
        !~exludeTypes.indexOf(typeof this[key]) &&
        !~exclude.indexOf(key)
      ) {
        res[key] = data[key];
      }
    }
    res.dateEdited = firebase.firestore.FieldValue.serverTimestamp();
    res.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
    return res;
  }

  toJSON(convert) {
    let res = {};
    const exludeTypes = ['function'];
    const exludeKeys = ['__keys__'];
    for (let key in this) {
      if (
        this.hasOwnProperty(key) &&
        !~exludeTypes.indexOf(typeof this[key]) &&
        !~exludeKeys.indexOf(key)
      ) {
        res[key] = this[key];
        if (convert && res[key]._methodName === 'FieldValue.serverTimestamp') {
          res[key] = moment(res[key]).format('LLLL');
        }
      }
    }
    return res;
  }
}

module.exports = AsbtractSchema;
