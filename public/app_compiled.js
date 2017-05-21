'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Message = exports.MessageBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageBox = function (_Component) {
	_inherits(MessageBox, _Component);

	function MessageBox() {
		_classCallCheck(this, MessageBox);

		var _this = _possibleConstructorReturn(this, (MessageBox.__proto__ || Object.getPrototypeOf(MessageBox)).call(this));

		_this.state = {
			messages: []
		};
		return _this;
	}

	_createClass(MessageBox, [{
		key: 'render',
		value: function render() {
			/*
   let msgs;
   if (this.messages) {
   	msgs = this.messages.map((msg) => );
   }
   */
			return _react2.default.createElement(
				'div',
				null,
				this.state.messages
			);
		}
	}, {
		key: '_addMessage',
		value: function _addMessage(message) {

			var messageElem = _react2.default.createElement(Message, { text: message });
			var messages = this.state.messages.concat([messageElem]);
			this.setState({ messages: messages });
		}
	}]);

	return MessageBox;
}(_react.Component);

var Message = function (_Component2) {
	_inherits(Message, _Component2);

	function Message() {
		_classCallCheck(this, Message);

		return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this));
	}

	_createClass(Message, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.text
			);
		}
	}]);

	return Message;
}(_react.Component);

/*
ReactDOM.render(
  <MessageBox />,
  document.getElementById('react-test')
);
*/

exports.MessageBox = MessageBox;
exports.Message = Message;

