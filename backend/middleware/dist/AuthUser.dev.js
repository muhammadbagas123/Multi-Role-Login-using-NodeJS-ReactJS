"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminOnly = exports.verifyUser = void 0;

var _UserModel = _interopRequireDefault(require("../model/UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyUser = function verifyUser(req, res, next) {
  var user;
  return regeneratorRuntime.async(function verifyUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.session.userId) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            msg: "Mohon login ke akun Anda!"
          }));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            where: {
              uuid: req.session.userId
            }
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            msg: "User tidak ditemukan"
          }));

        case 7:
          req.userId = user.id;
          req.role = user.role;
          next();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.verifyUser = verifyUser;

var adminOnly = function adminOnly(req, res, next) {
  var user;
  return regeneratorRuntime.async(function adminOnly$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            where: {
              uuid: req.session.userId
            }
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            msg: "User tidak ditemukan"
          }));

        case 5:
          if (!(user.role !== "admin")) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(403).json({
            msg: "Akses terlarang"
          }));

        case 7:
          next();

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.adminOnly = adminOnly;
//# sourceMappingURL=AuthUser.dev.js.map
