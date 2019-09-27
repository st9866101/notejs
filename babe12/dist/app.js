"use strict";

var _person = _interopRequireDefault(require("./person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var app = document.querySelector('#app');
var persons = [new _person["default"]('Peter', 'Lin', 26, 'male'), new _person["default"]('Bill', 'Chen', 28, 'male'), new _person["default"]('Flora', 'Hsu', 25, 'female')];
persons = [].concat(_toConsumableArray(persons), [new _person["default"]('小明', '李')]);
persons.forEach(function (p) {
  app.innerHTML += "<div data-age=\"".concat(p.age, "\">").concat(p.firstname, " ").concat(p.lastname, "</div>");
});