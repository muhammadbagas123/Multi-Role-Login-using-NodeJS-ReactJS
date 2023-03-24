"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Database = _interopRequireDefault(require("./config/Database.js"));

var _connectSessionSequelize = _interopRequireDefault(require("connect-session-sequelize"));

var _UserRoute = _interopRequireDefault(require("./routes/UserRoute.js"));

var _ProductRoute = _interopRequireDefault(require("./routes/ProductRoute.js"));

var _AuthRoute = _interopRequireDefault(require("./routes/AuthRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var sessionStore = (0, _connectSessionSequelize["default"])(_expressSession["default"].Store);
var store = new sessionStore({
  db: _Database["default"]
}); //(async()=>{
//    await db.sync();
//})();

app.use((0, _expressSession["default"])({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}));
app.use((0, _cors["default"])({
  credential: true,
  origin: 'http://localhost:3000'
}));
app.use(_express["default"].json());
app.use(_UserRoute["default"]);
app.use(_ProductRoute["default"]);
app.use(_AuthRoute["default"]); //store.sync();

app.listen(process.env.APP_PORT, function () {
  console.log('Server telah berjalan baik...');
});
//# sourceMappingURL=index.dev.js.map
