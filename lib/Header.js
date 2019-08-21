'use strict';

var _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var P = require('prop-types');

var onEnter = require('./onEnter');

module.exports = (_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return React.createElement("div", {
        className: "dp-header"
      }, React.createElement("div", {
        className: "dp-nav-table"
      }, React.createElement("div", {
        className: "dp-row"
      }, React.createElement("div", {
        tabIndex: "1",
        role: "link",
        className: "dp-prev-nav dp-nav-cell dp-cell",
        onClick: props.onPrev,
        onKeyUp: onEnter(props.onPrev)
      }, props.prevText), React.createElement("div", {
        tabIndex: "1",
        role: "link",
        className: "dp-nav-view dp-cell",
        colSpan: props.colspan,
        onClick: props.onChange,
        onKeyUp: onEnter(props.onChange)
      }, props.children), React.createElement("div", {
        tabIndex: "1",
        role: "link",
        className: "dp-next-nav dp-nav-cell dp-cell",
        onClick: props.onNext,
        onKeyUp: onEnter(props.onNext)
      }, props.nextText))));
    }
  }]);

  return _class;
}(React.Component), _defineProperty(_class, "displayName", 'DatePickerHeader'), _defineProperty(_class, "propTypes", {
  onChange: P.func,
  onPrev: P.func,
  onNext: P.func,
  colspan: P.number,
  children: P.node
}), _temp);