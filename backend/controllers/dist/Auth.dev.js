"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOut = exports.Me = exports.Login = void 0;

var _UserModel = _interopRequireDefault(require("../model/UserModel.js"));

var _argon = _interopRequireDefault(require("argon2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Login = function Login(req, res) {
  var user, match, uuid, name, email, role;
  return regeneratorRuntime.async(function Login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            where: {
              email: req.body.email
            }
          }));

        case 2:
          user = _context.sent;

          if (user) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            msg: "User tidak ditemukan"
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_argon["default"].verify(user.password, req.body.password));

        case 7:
          match = _context.sent;

          if (match) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: "Wrong Password"
          }));

        case 10:
          req.session.userId = user.uuid;
          uuid = user.uuid;
          name = user.name;
          email = user.email;
          role = user.role;
          res.status(200).json({
            uuid: uuid,
            name: name,
            email: email,
            role: role
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.Login = Login;

var Me = function Me(req, res) {
  var user;
  return regeneratorRuntime.async(function Me$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (req.session.userId) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            msg: "Mohon login ke akun Anda!"
          }));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
              uuid: req.session.userId
            }
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            msg: "User tidak ditemukan"
          }));

        case 7:
          res.status(200).json(user);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.Me = Me;

var logOut = function logOut(req, res) {
  req.session.destroy(function (err) {
    if (err) return res.status(400).json({
      msg: "Tidak dapat logout"
    });
    res.status(200).json({
      msg: "Anda telah logout"
    });
  });
};

exports.logOut = logOut;
//# sourceMappingURL=Auth.dev.js.map
