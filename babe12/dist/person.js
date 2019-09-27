"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person =
/*#__PURE__*/
function () {
  function Person(firstname, lastname) {
    var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
    var gender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'male';

    _classCallCheck(this, Person);

    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.gender = "male";
  }

  _createClass(Person, [{
    key: "toString",
    value: function toString() {
      return this.firstname + ' ' + this.lastname;
    }
  }, {
    key: "describe",
    value: function describe() {
      return "".concat(this.firstname, " ").concat(this.lastname, "\n            age: ").concat(this.age, "\n            gender: ").concat(this.gender);
    }
  }]);

  return Person;
}();

var _default = Person;
exports["default"] = _default;