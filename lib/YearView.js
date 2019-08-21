'use strict';

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

var FORMAT = require('./utils/format');

var asConfig = require('./utils/asConfig');

var toMoment = require('./toMoment');

var onEnter = require('./onEnter');

var assign = require('object-assign');

var TODAY;

function emptyFn() {}

var YearView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(YearView, _React$Component);

  function YearView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, YearView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(YearView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getMonthsInYear", value => {
      var start = moment(value).startOf('year');
      var result = [];
      var i = 0;

      for (; i < 12; i++) {
        result.push(moment(start));
        start.add(1, 'month');
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonths", (props, days) => {
      var nodes = days.map(function (date) {
        return this.renderMonth(props, date);
      }, _assertThisInitialized(_this));
      var len = days.length;
      var buckets = [];
      var bucketsLen = Math.ceil(len / 4);
      var i = 0;

      for (; i < bucketsLen; i++) {
        buckets.push(nodes.slice(i * 4, (i + 1) * 4));
      }

      return buckets.map(function (bucket, i) {
        return React.createElement("div", {
          key: "row" + i,
          className: "dp-row"
        }, bucket);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonth", (props, date) => {
      var monthText = FORMAT.month(date, props.monthFormat);
      var classes = ["dp-cell dp-month"];
      var dateTimestamp = +date;

      if (dateTimestamp == props.moment) {
        classes.push('dp-value');
      }

      var onClick = _this.handleClick.bind(_assertThisInitialized(_this), props, date);

      return React.createElement("div", {
        tabIndex: "1",
        role: "link",
        key: monthText,
        className: classes.join(' '),
        onClick: onClick,
        onKeyUp: onEnter(onClick)
      }, monthText);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", (props, date, event) => {
      event.target.value = date;
      (props.onSelect || emptyFn)(date, event);
    });

    return _this;
  }

  _createClass(YearView, [{
    key: "render",
    value: function render() {
      TODAY = +moment().startOf('day');
      var props = assign({}, this.props);
      var viewMoment = props.viewMoment = moment(this.props.viewDate);

      if (props.date) {
        props.moment = moment(props.date).startOf('month');
      }

      var monthsInView = this.getMonthsInYear(viewMoment);
      return React.createElement("div", {
        className: "dp-table dp-year-view"
      }, this.renderMonths(props, monthsInView));
    }
    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */

  }]);

  return YearView;
}(React.Component);

_defineProperty(YearView, "displayName", 'YearView');

_defineProperty(YearView, "defaultProps", asConfig());

YearView.getHeaderText = function (moment, props) {
  return toMoment(moment, null, {
    locale: props.locale
  }).format('YYYY');
};

module.exports = YearView;