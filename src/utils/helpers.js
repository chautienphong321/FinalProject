module.exports = {
  dateNow: new Date(),
  ifeq: function (a, b, options) {
    if (a == b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
  ifNotEq: function (a, b, options) {
    if (a != b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
  ifCond: function (v1, operator, v2, options) {
    switch (operator) {
      case "==":
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "!=":
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case "!==":
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case "<":
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case "<=":
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case ">":
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case ">=":
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case "&&":
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case "||":
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  },
  formatFilter: function (str) {
    return str
      .replace(/\b(\w+)/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1);
      })
      .replace(/-/g, " ");
  },
  getTime: function (val) {
    const time = new Date(val);
    time.setHours(time.getHours() + 16);
    const formatTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatTime;
  },
  formatCurrency: function (value) {
    if (value == 0) return value;
    const formattedValue = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return `${formattedValue.slice(0, -3)}.00`;
    // return value
  },
};
