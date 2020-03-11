import express from "express";
import errorhandler from "errorhandler";

//helpers
const hasFlag = (name: string) => process.argv.find(x => x === "--" + name);
const flagValue = (name: string, defaultsTo?: any) => {
  const index = process.argv.findIndex((x: string) => x === "--" + name);
  if (index === -1) return defaultsTo;
  const val = process.argv[index + 1];
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};

//constants
const HOST = "127.0.0.1";
const PORT = flagValue("port",3000);
const ENV = process.env.NODE_ENV === "development" ? "dev" : "prod";

//instances
const app = express();

//config
const ErrorHandler =
  ENV === "dev"
    ? errorhandler()
    : <express.ErrorRequestHandler>function(err, req, res, next) {
        console.error(err.stack);
      };

//routes
app.get("/", (req, res) => res.send("hello world"));
app.use(ErrorHandler);

app.listen(PORT,function(err?: Error){
  if (err){
    console.error(err);
    process.exit(1);
  } else {
    console.log(`TS Express server listening on ${PORT}`)
    console.log(`--------------------------------------`)
    console.log(`go to: http://${HOST}:${PORT}`);
  }
});
