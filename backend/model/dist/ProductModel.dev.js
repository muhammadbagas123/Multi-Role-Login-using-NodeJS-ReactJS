"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _Database = _interopRequireDefault(require("../config/Database.js"));

var _UserModel = _interopRequireDefault(require("./UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DataTypes = _sequelize.Sequelize.DataTypes;

var Products = _Database["default"].define('product', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100]
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

_UserModel["default"].hasMany(Products);

Products.belongsTo(_UserModel["default"], {
  foreignKey: 'userId'
});
var _default = Products;
exports["default"] = _default;
//# sourceMappingURL=ProductModel.dev.js.map
