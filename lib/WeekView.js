'use strict';

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var moment = require('moment');

module.exports = (_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getDaysForView", value => {
      var first = moment(value).startOf('month');

      var start = _this.getWeekStartMoment(first);

      var result = [];
      var i = 0;

      if (first.add('days', -1).isBefore(start)) {
        //make sure the last day of prev month is included
        start.add('weeks', -1);
      }

      for (; i < 42; i++) {
        result.push(moment(start));
        start.add('days', 1);
      }

      return result;
    });

    return _this;
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      var days = this.props.days;
      var date = this.props.date;
      return React.createElement("table", null, React.createElement("tbody", null, weekDayNames.map(renderDayName)));
    }
  }]);

  return _class;
}(React.Component), _defineProperty(_class, "displayName", 'WeekView'), _defineProperty(_class, "defaultProps", {
  days: [],
  date: null
}), _temp);