"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;

var _ProductModel = _interopRequireDefault(require("../model/ProductModel.js"));

var _UserModel = _interopRequireDefault(require("../model/UserModel.js"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getProducts = function getProducts(req, res) {
  var response;
  return regeneratorRuntime.async(function getProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(req.role === "admin")) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_ProductModel["default"].findAll({
            attributes: ['uuid', 'name', 'price'],
            include: [{
              model: _UserModel["default"],
              attributes: ['name', 'email']
            }]
          }));

        case 4:
          response = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_ProductModel["default"].findAll({
            attributes: ['uuid', 'name', 'price'],
            where: {
              userId: req.userId
            },
            include: [{
              model: _UserModel["default"],
              attributes: ['name', 'email']
            }]
          }));

        case 9:
          response = _context.sent;

        case 10:
          res.status(200).json(response);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            msg: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getProducts = getProducts;

var getProductById = function getProductById(req, res) {
  var product, response;
  return regeneratorRuntime.async(function getProductById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_ProductModel["default"].findOne({
            where: {
              uuid: req.params.id
            }
          }));

        case 3:
          product = _context2.sent;

          if (product) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            msg: "Data tidak ditemukan"
          }));

        case 6:
          if (!(req.role === "admin")) {
            _context2.next = 12;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(_ProductModel["default"].findOne({
            attributes: ['uuid', 'name', 'price'],
            where: {
              id: product.id
            },
            include: [{
              model: _UserModel["default"],
              attributes: ['name', 'email']
            }]
          }));

        case 9:
          response = _context2.sent;
          _context2.next = 15;
          break;

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(_ProductModel["default"].findOne({
            attributes: ['uuid', 'name', 'price'],
            where: _defineProperty({}, _sequelize.Op.and, [{
              id: product.id
            }, {
              userId: req.userId
            }]),
            include: [{
              model: _UserModel["default"],
              attributes: ['name', 'email']
            }]
          }));

        case 14:
          response = _context2.sent;

        case 15:
          res.status(200).json(response);
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            msg: _context2.t0.message
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.getProductById = getProductById;

var createProduct = function createProduct(req, res) {
  var _req$body, name, price;

  return regeneratorRuntime.async(function createProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, price = _req$body.price;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_ProductModel["default"].create({
            name: name,
            price: price,
            userId: req.userId
          }));

        case 4:
          res.status(201).json({
            msg: "Product Created Successfuly"
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            msg: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.createProduct = createProduct;

var updateProduct = function updateProduct(req, res) {
  var product, _req$body2, name, price;

  return regeneratorRuntime.async(function updateProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_ProductModel["default"].findOne({
            where: {
              uuid: req.params.id
            }
          }));

        case 3:
          product = _context4.sent;

          if (product) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: "Data tidak ditemukan"
          }));

        case 6:
          _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price;

          if (!(req.role === "admin")) {
            _context4.next = 12;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(_ProductModel["default"].update({
            name: name,
            price: price
          }, {
            where: {
              id: product.id
            }
          }));

        case 10:
          _context4.next = 16;
          break;

        case 12:
          if (!(req.userId !== product.userId)) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", res.status(403).json({
            msg: "Akses terlarang"
          }));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(_ProductModel["default"].update({
            name: name,
            price: price
          }, {
            where: _defineProperty({}, _sequelize.Op.and, [{
              id: product.id
            }, {
              userId: req.userId
            }])
          }));

        case 16:
          res.status(200).json({
            msg: "Product updated successfuly"
          });
          _context4.next = 22;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            msg: _context4.t0.message
          });

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

exports.updateProduct = updateProduct;

var deleteProduct = function deleteProduct(req, res) {
  var product, _req$body3, name, price;

  return regeneratorRuntime.async(function deleteProduct$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_ProductModel["default"].findOne({
            where: {
              uuid: req.params.id
            }
          }));

        case 3:
          product = _context5.sent;

          if (product) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: "Data tidak ditemukan"
          }));

        case 6:
          _req$body3 = req.body, name = _req$body3.name, price = _req$body3.price;

          if (!(req.role === "admin")) {
            _context5.next = 12;
            break;
          }

          _context5.next = 10;
          return regeneratorRuntime.awrap(_ProductModel["default"].destroy({
            where: {
              id: product.id
            }
          }));

        case 10:
          _context5.next = 16;
          break;

        case 12:
          if (!(req.userId !== product.userId)) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", res.status(403).json({
            msg: "Akses terlarang"
          }));

        case 14:
          _context5.next = 16;
          return regeneratorRuntime.awrap(_ProductModel["default"].destroy({
            where: _defineProperty({}, _sequelize.Op.and, [{
              id: product.id
            }, {
              userId: req.userId
            }])
          }));

        case 16:
          res.status(200).json({
            msg: "Product deleted successfuly"
          });
          _context5.next = 22;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            msg: _context5.t0.message
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

exports.deleteProduct = deleteProduct;
//# sourceMappingURL=Products.dev.js.map
