'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxReact = require('rx-react');

var _rxReact2 = _interopRequireDefault(_rxReact);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = function (_RxReact$Component) {
  _inherits(BaseComponent, _RxReact$Component);

  _createClass(BaseComponent, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        observeOn: new _rx2.default.Subject(),
        publishOn: new _rx2.default.Subject()
      };
    }
  }]);

  function BaseComponent(props) {
    _classCallCheck(this, BaseComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

    _this.state = {};
    _this.state = (0, _deepAssign2.default)({}, _this.props);
    return _this;
  }

  _createClass(BaseComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState(props);
    }
  }, {
    key: 'getStateStream',
    value: function getStateStream() {
      return this.props.observeOn;
    }
  }]);

  return BaseComponent;
}(_rxReact2.default.Component);

exports.default = BaseComponent;