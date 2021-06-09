const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const jsonErrorHandler = require("./services/jsonErrorHandler");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const routeNotFoundJsonHandler = require("./services/routeNotFoundJsonHandler");

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jsonErrorHandler);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use(routeNotFoundJsonHandler);

const port = parseInt(process.env.PORT || "3000");

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
