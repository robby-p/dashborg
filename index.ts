import express from "express";
import errorhandler from "errorhandler";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import WebpackHotMiddlware from "webpack-hot-middleware";
import webpackConfig from "./webpack.config";
import { rootPath, flagValue } from "./utils";

//constants
const HOST = flagValue("host", "127.0.0.1"); // flag: --host
const PORT = flagValue("port", 3000); // flag: --port
const IS_DEV = process.env.NODE_ENV === "development";
const MODE = IS_DEV ? "development" : "production";

//webpack
const webpackCompiler = webpack({ mode: MODE, ...webpackConfig });

//instances
const webpackInstance = webpackDevMiddleware(webpackCompiler);
const app = express();

app.use(webpackInstance);
app.use(WebpackHotMiddlware(webpackCompiler));

//config
const ErrorHandler = IS_DEV
  ? errorhandler()
  : <express.ErrorRequestHandler>function (err, req, res, next) {
      console.error(err.stack);
    };

//routes
app.get("/ping", (req, res) => res.json({ pong: true }));
app.use(ErrorHandler);

//index html catchall

app.get("*", (req, res) => res.sendFile(rootPath("dist/index.html")));

app.listen(PORT, function (err?: Error) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`TS Express server listening on ${PORT}`);
    console.log(`--------------------------------------`);
    console.log(`go to: http://${HOST}:${PORT}`);
  }
});
