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

var assign = require('object-assign');

var FORMAT = require('./utils/format');

var asConfig = require('./utils/asConfig');

var toMoment = require('./toMoment');

var onEnter = require('./onEnter');

var assign = require('object-assign');

var TODAY;

function emptyFn() {}

let DecadeView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DecadeView, _React$Component);

  function DecadeView(...args) {
    var _this;

    _classCallCheck(this, DecadeView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DecadeView).call(this, ...args));

    _defineProperty(_assertThisInitialized(_this), "getYearsInDecade", value => {
      var year = moment(value).get('year');
      var offset = year % 10;
      year = year - offset - 1;
      var result = [];
      var i = 0;
      var start = moment(year, 'YYYY').startOf('year');

      for (; i < 12; i++) {
        result.push(moment(start));
        start.add(1, 'year');
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "renderYears", (props, days) => {
      var nodes = days.map(function (date, index, arr) {
        return this.renderYear(props, date, index, arr);
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

    _defineProperty(_assertThisInitialized(_this), "renderYear", (props, date, index, arr) => {
      var yearText = FORMAT.year(date, props.yearFormat);
      var classes = ["dp-cell dp-year"];
      var dateTimestamp = +date;

      if (dateTimestamp == props.moment) {
        classes.push('dp-value');
      }

      if (!index) {
        classes.push('dp-prev');
      }

      if (index == arr.length - 1) {
        classes.push('dp-next');
      }

      var onClick = _this.handleClick.bind(_assertThisInitialized(_this), props, date);

      return React.createElement("div", {
        role: "link",
        tabIndex: "1",
        key: yearText,
        className: classes.join(' '),
        onClick: onClick,
        onKeyUp: onEnter(onClick)
      }, yearText);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", (props, date, event) => {
      event.target.value = date;
      (props.onSelect || emptyFn)(date, event);
    });

    return _this;
  }

  _createClass(DecadeView, [{
    key: "render",
    value: function render() {
      TODAY = +moment().startOf('day');
      var props = assign({}, this.props);
      var viewMoment = props.viewMoment = moment(this.props.viewDate);

      if (props.date) {
        props.moment = moment(props.date).startOf('year');
      }

      var yearsInView = this.getYearsInDecade(viewMoment);
      return React.createElement("div", {
        className: "dp-table dp-decade-view"
      }, this.renderYears(props, yearsInView));
    }
    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */

  }]);

  return DecadeView;
}(React.Component);

_defineProperty(DecadeView, "displayName", 'DecadeView');

_defineProperty(DecadeView, "defaultProps", asConfig());

DecadeView.getHeaderText = function (value, props) {
  var year = moment(value).get('year');
  var offset = year % 10;
  year = year - offset - 1;
  return year + ' - ' + (year + 11);
};

module.exports = DecadeView;