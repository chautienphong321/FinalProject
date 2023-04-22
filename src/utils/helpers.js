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
  getTime: function (from, to) {
    const fromTime = new Date(from);
    fromTime.setHours(fromTime.getHours() + 16);
    const formattedFromTime = fromTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const toTime = new Date(to);
    toTime.setHours(toTime.getHours() + 16);
    const formattedToTime = toTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedFromTime} - ${formattedToTime}`;
  },
  // formatCurrency: function (value) {
  //   if (value == 0) return value;
  //   return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  //   // return value
  // },
};
