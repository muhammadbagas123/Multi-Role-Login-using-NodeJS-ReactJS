"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsertById = exports.getUsers = void 0;

var _UserModel = _interopRequireDefault(require("../model/UserModel.js"));

var _argon = _interopRequireDefault(require("argon2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUsers = function getUsers(req, res) {
  var response;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_UserModel["default"].findAll({
            attributes: ['uuid', 'name', 'email', 'role']
          }));

        case 3:
          response = _context.sent;
          res.status(200).json(response);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            msg: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getUsers = getUsers;

var getUsertById = function getUsertById(req, res) {
  var response;
  return regeneratorRuntime.async(function getUsertById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
              uuid: req.params.id
            }
          }));

        case 3:
          response = _context2.sent;
          res.status(200).json(response);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            msg: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getUsertById = getUsertById;

var createUser = function createUser(req, res) {
  var _req$body, name, email, password, confPassword, role, hashPassword;

  return regeneratorRuntime.async(function createUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, confPassword = _req$body.confPassword, role = _req$body.role;

          if (!(password !== confPassword)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            msg: "password dan confirm password tidak cocok"
          }));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(_argon["default"].hash(password));

        case 5:
          hashPassword = _context3.sent;
          _context3.prev = 6;
          _context3.next = 9;
          return regeneratorRuntime.awrap(_UserModel["default"].create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
          }));

        case 9:
          res.status(201).json({
            msg: "register berhasil"
          });
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](6);
          res.status(400).json({
            msg: _context3.t0.message
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 12]]);
};

exports.createUser = createUser;

var updateUser = function updateUser(req, res) {
  var user, _req$body2, name, email, password, confPassword, role, hashPassword;

  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            where: {
              uuid: req.params.id
            }
          }));

        case 2:
          user = _context4.sent;

          if (user) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: "User tidak ditemukan"
          }));

        case 5:
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, confPassword = _req$body2.confPassword, role = _req$body2.role;

          if (!(password === "" || password === null)) {
            _context4.next = 10;
            break;
          }

          hashPassword = user.password;
          _context4.next = 13;
          break;

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(_argon["default"].hash(password));

        case 12:
          hashPassword = _context4.sent;

        case 13:
          if (!(password !== confPassword)) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: "password dan confirm password tidak cocok"
          }));

        case 15:
          _context4.prev = 15;
          _context4.next = 18;
          return regeneratorRuntime.awrap(_UserModel["default"].update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
          }, {
            where: {
              id: user.id
            }
          }));

        case 18:
          res.status(200).json({
            msg: "User Updated"
          });
          _context4.next = 24;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](15);
          res.status(400).json({
            msg: _context4.t0.message
          });

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[15, 21]]);
};

exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res) {
  var user;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            where: {
              uuid: req.params.id
            }
          }));

        case 2:
          user = _context5.sent;

          if (user) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: "User tidak ditemukan"
          }));

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(_UserModel["default"].destroy({
            where: {
              id: user.id
            }
          }));

        case 8:
          res.status(200).json({
            msg: "User Deleted"
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](5);
          res.status(400).json({
            msg: _context5.t0.message
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 11]]);
};

exports.deleteUser = deleteUser;
//# sourceMappingURL=Users.dev.js.map
