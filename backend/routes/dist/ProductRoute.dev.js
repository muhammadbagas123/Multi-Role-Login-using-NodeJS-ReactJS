"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Products = require("../controllers/Products.js");

var _AuthUser = require("../middleware/AuthUser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/products', _AuthUser.verifyUser, _Products.getProducts);
router.get('/products/:id', _AuthUser.verifyUser, _Products.getProductById);
router.post('/products', _AuthUser.verifyUser, _Products.createProduct);
router.patch('/products/:id', _AuthUser.verifyUser, _Products.updateProduct);
router["delete"]('/products/:id', _AuthUser.verifyUser, _Products.deleteProduct);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=ProductRoute.dev.js.map
