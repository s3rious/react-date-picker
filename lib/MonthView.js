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

var onEnter = require('./onEnter');

var toMoment = require('./toMoment');

var TODAY;

function emptyFn() {}

var MonthView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MonthView, _React$Component);

  function MonthView(...args) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MonthView);

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MonthView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "formatAsDay", (moment, dayDisplayFormat) => {
      return moment.format(dayDisplayFormat || 'D');
    });

    _defineProperty(_assertThisInitialized(_this), "getWeekStartMoment", value => {
      var weekStartDay = _this.weekStartDay;

      var clone = _this.toMoment(value).day(weekStartDay);

      return clone;
    });

    _defineProperty(_assertThisInitialized(_this), "getDaysInMonth", value => {
      var first = _this.toMoment(value).startOf('month');

      var start = _this.getWeekStartMoment(first);

      var result = [];
      var i = 0;

      if (first.add(-1, 'days').isBefore(start)) {
        //make sure the last day of prev month is included
        start.add(-1, 'weeks');
      }

      for (; i < 42; i++) {
        result.push(_this.toMoment(start));
        start.add(1, 'days');
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "renderDays", (props, days) => {
      var nodes = days.map(function (date) {
        return this.renderDay(props, date);
      }, _assertThisInitialized(_this));
      var len = days.length;
      var buckets = [];
      var bucketsLen = Math.ceil(len / 7);
      var i = 0;

      for (; i < bucketsLen; i++) {
        buckets.push(nodes.slice(i * 7, (i + 1) * 7));
      }

      return buckets.map(function (bucket, i) {
        return React.createElement("div", {
          key: "row" + i,
          className: "dp-week dp-row"
        }, bucket);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDay", (props, date) => {
      var dayText = FORMAT.day(date, props.dayFormat);
      var classes = ["dp-cell dp-day"];
      var dateTimestamp = +date;

      if (dateTimestamp == TODAY) {
        classes.push('dp-current');
      } else if (dateTimestamp < _this.monthFirst) {
        classes.push('dp-prev');
      } else if (dateTimestamp > _this.monthLast) {
        classes.push('dp-next');
      }

      var beforeMinDate;

      if (props.minDate && date < props.minDate) {
        classes.push('dp-disabled dp-before-min');
        beforeMinDate = true;
      }

      var afterMaxDate;

      if (props.maxDate && date > props.maxDate) {
        classes.push('dp-disabled dp-after-max');
        afterMaxDate = true;
      }

      if (dateTimestamp == props.moment) {
        classes.push('dp-value');
      }

      var mom = _this.toMoment(date);

      var onClick = _this.handleClick.bind(_assertThisInitialized(_this), props, date, dateTimestamp);

      var renderDayProps = {
        role: 'link',
        tabIndex: 1,
        key: dayText,
        text: dayText,
        date: mom,
        moment: mom,
        className: classes.join(' '),
        style: {},
        onClick: onClick,
        onKeyUp: onEnter(onClick),
        children: dayText
      };

      if (beforeMinDate) {
        renderDayProps.isDisabled = true;
        renderDayProps.beforeMinDate = true;
      }

      if (afterMaxDate) {
        renderDayProps.isDisabled = true;
        renderDayProps.afterMaxDate = true;
      }

      if (typeof props.onRenderDay === 'function') {
        renderDayProps = props.onRenderDay(renderDayProps);
      }

      var result;

      if (props.renderDay) {
        result = props.renderDay;
      } else {
        result = React.createElement('div', renderDayProps);
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "getWeekDayNames", props => {
      props = props || _this.props;
      var names = props.weekDayNames;
      var weekStartDay = _this.weekStartDay;

      if (typeof names == 'function') {
        names = names(weekStartDay, props.locale);
      } else if (Array.isArray(names)) {
        names = [].concat(names);
        var index = weekStartDay;

        while (index > 0) {
          names.push(names.shift());
          index--;
        }
      }

      return names;
    });

    _defineProperty(_assertThisInitialized(_this), "renderWeekDayNames", () => {
      var names = _this.getWeekDayNames();

      return React.createElement("div", {
        className: "dp-row dp-week-day-names"
      }, names.map((name, index) => React.createElement("div", {
        key: index,
        className: "dp-cell dp-week-day-name"
      }, name)));
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", (props, date, timestamp, event) => {
      if (props.minDate && timestamp < props.minDate) {
        return;
      }

      if (props.maxDate && timestamp > props.maxDate) {
        return;
      }

      event.target.value = date;
      (props.onChange || emptyFn)(date, event);
    });

    return _this;
  }

  _createClass(MonthView, [{
    key: "render",
    value: function render() {
      var props = assign({}, this.props);

      this.toMoment = function (value, dateFormat) {
        return toMoment(value, dateFormat || props.dateFormat, {
          locale: props.locale
        });
      };

      TODAY = +this.toMoment().startOf('day');
      var dateFormat = props.dateFormat;
      var viewMoment = props.viewMoment = this.toMoment(props.viewDate, dateFormat);
      var weekStartDay = props.weekStartDay;

      if (weekStartDay == null) {
        weekStartDay = props.localeData._week ? props.localeData._week.dow : null;
      }

      this.weekStartDay = props.weekStartDay = weekStartDay;

      if (props.minDate && moment.isMoment(props.minDate)) {
        props.minDate.startOf('day');
      }

      props.minDate && (props.minDate = +this.toMoment(props.minDate, dateFormat));
      props.maxDate && (props.maxDate = +this.toMoment(props.maxDate, dateFormat));
      this.monthFirst = this.toMoment(viewMoment).startOf('month');
      this.monthLast = this.toMoment(viewMoment).endOf('month');

      if (props.date) {
        props.moment = this.toMoment(props.date).startOf('day');
      }

      var daysInView = this.getDaysInMonth(viewMoment);
      return React.createElement("div", {
        className: "dp-table dp-month-view"
      }, this.renderWeekDayNames(), this.renderDays(props, daysInView));
    }
    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */

  }]);

  return MonthView;
}(React.Component);

_defineProperty(MonthView, "displayName", 'MonthView');

_defineProperty(MonthView, "defaultProps", asConfig());

MonthView.getHeaderText = function (moment, props) {
  return toMoment(moment, null, {
    locale: props.locale
  }).format('MMMM YYYY');
};

export default MonthView;