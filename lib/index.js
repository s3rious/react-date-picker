'use strict';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var PropTypes = require('prop-types');

var moment = require('moment');

var assign = require('object-assign');

var asConfig = require('./utils/asConfig');

var MonthView = require('./MonthView');

var YearView = require('./YearView');

var DecadeView = require('./DecadeView');

var Header = require('./Header');

var toMoment = require('./toMoment');

var hasOwn = function (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

var onEnter = require('./onEnter');

var Views = {
  month: MonthView,
  year: YearView,
  decade: DecadeView
};

function emptyFn() {}

let DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(...args) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, ...args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      view: _this.props.defaultView,
      viewDate: _this.props.defaultViewDate,
      defaultDate: _this.props.defaultDate
    });

    _defineProperty(_assertThisInitialized(_this), "getViewOrder", () => {
      return _this.props.viewOrder || ['month', 'year', 'decade'];
    });

    _defineProperty(_assertThisInitialized(_this), "getViewName", () => {
      var view = _this.props.view != null ? _this.props.view : _this.state.view;
      return view || 'month';
    });

    _defineProperty(_assertThisInitialized(_this), "addViewIndex", amount => {
      var viewName = _this.getViewName();

      var order = _this.getViewOrder();

      var index = order.indexOf(viewName);
      index += amount;
      return index % order.length;
    });

    _defineProperty(_assertThisInitialized(_this), "getNextViewName", () => {
      return _this.getViewOrder()[_this.addViewIndex(1)];
    });

    _defineProperty(_assertThisInitialized(_this), "getPrevViewName", () => {
      return _this.getViewOrder()[_this.addViewIndex(-1)];
    });

    _defineProperty(_assertThisInitialized(_this), "getView", () => {
      var views = _this.props.views || Views;
      return views[_this.getViewName()] || views.month;
    });

    _defineProperty(_assertThisInitialized(_this), "getViewFactory", () => {
      var view = _this.getView();

      if (React.createFactory && view && view.prototype && typeof view.prototype.render == 'function') {
        view.__factory = view.__factory || React.createFactory(view);
        view = view.__factory;
      }

      return view;
    });

    _defineProperty(_assertThisInitialized(_this), "getViewDate", () => {
      var date = hasOwn(_this.props, 'viewDate') ? _this.props.viewDate : _this.state.viewDate;
      date = date || _this.viewMoment || _this.getDate() || new Date();

      if (moment.isMoment(date)) {
        //in order to strip the locale - the date picker may have had its locale changed
        //between two render calls. If we don't strip this, moment(mom) returns a new moment
        //with the locale of mom, which is not what we want
        date = +date;
      }

      date = _this.toMoment(date);
      return date;
    });

    _defineProperty(_assertThisInitialized(_this), "getDate", () => {
      var date;

      if (hasOwn(_this.props, 'date')) {
        date = _this.props.date;
      } else {
        date = _this.state.defaultDate;
      }

      return date ? _this.toMoment(date) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "prepareStyle", props => {
      return assign({}, props.defaultStyle, props.style);
    });

    _defineProperty(_assertThisInitialized(_this), "renderFooter", props => {
      if (_this.props.hideFooter) {
        return;
      }

      if (_this.props.today) {
        console.warn('Please use "todayText" prop instead of "today"!');
      }

      if (_this.props.gotoSelected) {
        console.warn('Please use "gotoSelectedText" prop instead of "gotoSelected"!');
      }

      var todayText = _this.props.todayText || 'Today';
      var gotoSelectedText = _this.props.gotoSelectedText || 'Go to selected';
      var footerProps = {
        todayText: todayText,
        gotoSelectedText: gotoSelectedText,
        gotoToday: _this.gotoNow,
        gotoSelected: _this.gotoSelected.bind(_assertThisInitialized(_this), props),
        date: props.date,
        viewDate: props.viewDate
      };
      var result;

      if (typeof _this.props.footerFactory == 'function') {
        result = _this.props.footerFactory(footerProps);
      }

      if (result !== undefined) {
        return result;
      }

      return React.createElement("div", {
        className: "dp-footer"
      }, React.createElement("div", {
        tabIndex: "1",
        role: "link",
        className: "dp-footer-today",
        onClick: footerProps.gotoToday,
        onKeyUp: onEnter(footerProps.gotoToday)
      }, todayText), React.createElement("div", {
        tabIndex: "1",
        role: "link",
        className: "dp-footer-selected",
        onClick: footerProps.gotoSelected,
        onKeyUp: onEnter(footerProps.gotoSelected)
      }, gotoSelectedText));
    });

    _defineProperty(_assertThisInitialized(_this), "gotoNow", () => {
      _this.gotoDate(+new Date());
    });

    _defineProperty(_assertThisInitialized(_this), "gotoSelected", props => {
      _this.gotoDate(props.date || +new Date());
    });

    _defineProperty(_assertThisInitialized(_this), "gotoDate", value => {
      _this.setView('month');

      _this.setViewDate(value);
    });

    _defineProperty(_assertThisInitialized(_this), "getViewColspan", () => {
      var map = {
        month: 5,
        year: 2,
        decade: 2
      };
      return map[_this.getViewName()];
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", (view, props) => {
      if (_this.props.hideHeader) {
        return;
      }

      props = props || _this.props;

      var viewDate = _this.getViewDate();

      var headerText = function () {
        var localView = this.getView();

        if (localView && localView.getHeaderText) {
          return localView.getHeaderText(viewDate, props);
        }

        if (localView && localView.default && localView.default.getHeaderText) {
          return localView.default.getHeaderText(viewDate, props);
        }

        throw new Error('BAD GUY');
      }();

      var colspan = _this.getViewColspan();

      var prev = _this.props.navPrev;
      var next = _this.props.navNext;
      return React.createElement(Header, {
        prevText: prev,
        nextText: next,
        colspan: colspan,
        onPrev: _this.handleNavPrev,
        onNext: _this.handleNavNext,
        onChange: _this.handleViewChange
      }, headerText);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRenderDay", date => {
      return (_this.props.renderDay || emptyFn)(date) || [];
    });

    _defineProperty(_assertThisInitialized(_this), "handleViewChange", () => {
      _this.setView(_this.getNextViewName());
    });

    _defineProperty(_assertThisInitialized(_this), "setView", view => {
      if (typeof _this.props.onViewChange == 'function') {
        _this.props.onViewChange(view);
      }

      if (_this.props.view == null) {
        _this.setState({
          view: view
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setViewDate", moment => {
      moment = _this.toMoment(moment);
      var fn = _this.props.onViewDateChange;

      if (typeof fn == 'function') {
        var text = moment.format(_this.props.dateFormat);

        var view = _this.getViewName();

        fn(text, moment, view);
      }

      if (!hasOwn(_this.props, 'viewDate')) {
        _this.setState({
          viewDate: moment
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getNext", () => {
      var current = _this.getViewDate();

      var toMoment = _this.toMoment;
      return {
        month: function () {
          return toMoment(current).add(1, 'month');
        },
        year: function () {
          return toMoment(current).add(1, 'year');
        },
        decade: function () {
          return toMoment(current).add(10, 'year');
        }
      }[_this.getViewName()]();
    });

    _defineProperty(_assertThisInitialized(_this), "getPrev", () => {
      var current = _this.getViewDate();

      var toMoment = _this.toMoment;
      return {
        month: function () {
          return toMoment(current).add(-1, 'month');
        },
        year: function () {
          return toMoment(current).add(-1, 'year');
        },
        decade: function () {
          return toMoment(current).add(-10, 'year');
        }
      }[_this.getViewName()]();
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavigation", (direction, event) => {
      var viewMoment = direction == -1 ? _this.getPrev() : _this.getNext();

      _this.setViewDate(viewMoment);

      if (typeof _this.props.onNav === 'function') {
        var text = viewMoment.format(_this.props.dateFormat);

        var view = _this.getViewName();

        _this.props.onNav(text, viewMoment, view, direction, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavPrev", event => {
      _this.handleNavigation(-1, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavNext", event => {
      _this.handleNavigation(1, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", (date, event) => {
      date = _this.toMoment(date);

      if (_this.props.navOnDateClick) {
        var viewDate = _this.toMoment(_this.getViewDate()); //it's not enough to compare months, since the year can change as well
        //
        //also it's ok to hardcode the format here


        var viewMonth = viewDate.format('YYYY-MM');
        var dateMonth = date.format('YYYY-MM');

        if (dateMonth > viewMonth) {
          _this.handleNavNext(event);
        } else if (dateMonth < viewMonth) {
          _this.handleNavPrev(event);
        }
      }

      var text = date.format(_this.props.dateFormat);

      if (!hasOwn(_this.props, 'date')) {
        _this.setState({
          defaultDate: text
        });
      }

      ;
      (_this.props.onChange || emptyFn)(text, date, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", (date, event) => {
      var viewName = _this.getViewName();

      var property = {
        decade: 'year',
        year: 'month'
      }[viewName];
      var value = date.get(property);

      var viewMoment = _this.toMoment(_this.getViewDate()).set(property, value);

      var view = _this.getPrevViewName();

      _this.setViewDate(viewMoment);

      _this.setView(view);

      if (typeof _this.props.onSelect === 'function') {
        var text = viewMoment.format(_this.props.dateFormat);

        _this.props.onSelect(text, viewMoment, view, event);
      }
    });

    return _this;
  }

  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      var props = assign({}, this.props);

      this.toMoment = function (value, dateFormat) {
        return toMoment(value, dateFormat || props.dateFormat, {
          locale: props.locale
        });
      };

      var view = this.getViewFactory();
      props.date = this.getDate();
      var dateString = props.date == null ? '' : props.date.format(this.props.dateFormat);
      props.viewDate = this.viewMoment = this.getViewDate();
      props.locale = this.props.locale;
      props.localeData = moment.localeData(props.locale);
      props.renderDay = this.props.renderDay;
      props.onRenderDay = this.props.onRenderDay; // props.onChange  = this.handleChange
      // props.onSelect  = this.handleSelect

      var className = (this.props.className || '') + ' date-picker';
      props.style = this.prepareStyle(props);
      var viewProps = props;
      var viewProps = asConfig(props);
      viewProps.dateString = dateString;
      viewProps.localeData = props.localeData;
      viewProps.onSelect = this.handleSelect;
      viewProps.onChange = this.handleChange;
      return React.createElement("div", _extends({}, this.props, {
        className: className,
        style: props.style
      }), this.renderHeader(view, props), React.createElement("div", {
        className: "dp-body",
        style: {
          flex: 1
        }
      }, view(viewProps)), this.renderFooter(props));
    }
  }]);

  return DatePicker;
}(React.Component);

_defineProperty(DatePicker, "displayName", 'DatePicker');

_defineProperty(DatePicker, "propTypes", {
  todayText: PropTypes.string,
  gotoSelectedText: PropTypes.string,
  renderFooter: PropTypes.func,
  onChange: PropTypes.func,
  date: PropTypes.any,
  viewDate: PropTypes.any
});

_defineProperty(DatePicker, "defaultProps", function () {
  var props = assign({}, asConfig(), {
    navOnDateClick: true,
    defaultStyle: {
      boxSizing: 'border-box'
    }
  });
  delete props.viewDate;
  delete props.date;
  return props;
}());

DatePicker.views = Views;
var PT = PropTypes;
DatePicker.propTypes = {
  /**
   * Function to be called when user selects a date.
   *
   * Called with the following params:
   *
   * @param {String} dateText Date formatted as string
   * @param {Moment} moment Moment.js instance
   * @param {Event} event
   *
   * @type {Function}
   */
  onChange: PT.func,

  /**
   * Function to be called when the user navigates to the next/prev month/year/decade
   *
   * Called with the following params:
   *
   * @param {String} dateText Date formatted as string
   * @param {Moment} moment Moment.js instance
   * @param {String} view The name of the current view (eg: "month")
   * @param {Number} direction 1 or -1. 1 if the right arrow, to nav to next period was pressed. -1 if the left arrow, to nav to the prev period was pressed.
   * @param {Event} event
   *
   * @type {Function}
   */
  onNav: PT.func,

  /**
   * Function to be called when the user selects a year/month.
   *
   * Called with the following params:
   *
   * @param {String} dateText Date formatted as string
   * @param {Moment} moment Moment.js instance
   * @param {String} view The name of the view displayed after following the selection. For now, either "year" or "month"
   *
   * @type {Function}
   */
  onSelect: PT.func,

  /**
   * A function that should return a React DOM for the day cell. The first param is the props object.
   * You can use this to have full control over what gets rendered for a day.
   *
   * @param {Object} dayProps The props object passed to day rendering
   *
   * @type {Function}
   */
  renderDay: PT.func,

  /**
   * A function that can manipulate the props object for a day, and SHOULD return a props object (a new one, or the same).
   * Use this for CUSTOM DAY STYLING.
   * You can use this to take full control over the styles/css classes/attributes applied to the day cell in the month view.
   *
   * @param {Object} dayProps
   * @return {Object} dayProps
   *
   * @type {Function}
   */
  onRenderDay: PT.func,

  /******************************************/

  /********** VIEW-related props ************/

  /******************************************/

  /**
   * The default view to show in the picker. This is an uncontrolled prop.
   * If none specified, the default view will be "month"
   *
   * @type {String}
   */
  defaultView: PT.string,

  /**
   * The view to show in the picker. This is a CONTROLLED prop!
   *
   * When using this controlled prop, make sure you update it when `onViewChange` function is called
   * if you want to navigate to another view, as expected.
   *
   * @type {String}
   */
  view: PT.string,

  /**
   * A function to be called when navigating to another view date.
   *
   * Called with the following params:
   *
   * @param {String} dateText Date formatted as string
   * @param {Moment} moment Moment.js instance
   * @param {String} view the name of the view displayed after the navigation occurs.
   *
   * @type {Function}
   */
  onViewDateChange: PT.func,

  /**
   * A function to be called when the view is changed.
   * If you're using the controlled `view` prop, make sure you update the `view` prop in this function if you want to navigate to another view, as expected.
   *
   * @param {String} nextView One of "month", "year", "decade"
   *
   * @type {Function}
   */
  onViewChange: PT.func,

  /**
   * Defaults to true. If specified as false, will not navigate to the date that was clicked, even if that date is in the prev/next month
   * @type {Boolean}
   */
  navOnDateClick: PT.bool
};
module.exports = DatePicker;