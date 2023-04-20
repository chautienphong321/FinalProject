module.exports = {
  mulToObject: function (list) {
    return list.map((item) => item.toObject());
  },
  toObject: function (item) {
    return item ? item.toObject() : item;
  },
};
