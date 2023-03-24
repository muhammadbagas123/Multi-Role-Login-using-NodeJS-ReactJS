"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Auth = require("../controllers/Auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/me', _Auth.Me);
router.post('/login', _Auth.Login);
router["delete"]('/logout', _Auth.logOut);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=AuthRoute.dev.js.map
