"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = require("../controllers/Users.js");

var _AuthUser = require("../middleware/AuthUser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/users', _AuthUser.verifyUser, _AuthUser.adminOnly, _Users.getUsers);
router.get('/users/:id', _AuthUser.verifyUser, _AuthUser.adminOnly, _Users.getUsertById);
router.post('/users', _AuthUser.verifyUser, _AuthUser.adminOnly, _Users.createUser);
router.patch('/users/:id', _AuthUser.verifyUser, _AuthUser.adminOnly, _Users.updateUser);
router["delete"]('/users/:id', _AuthUser.verifyUser, _AuthUser.adminOnly, _Users.deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=UserRoute.dev.js.map
