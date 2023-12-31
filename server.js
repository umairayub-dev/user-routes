require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRouter");
const movieRoutes = require("./routes/MovieRouter");
const favoriteRoutes = require("./routes/FavoriteRouter");
const reviewRoutes = require("./routes/ReviewRouter");
const dashboard = require("./routes/Dashboard");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", reviewRoutes);
app.use("/api", dashboard);

const PORT = process.env.PORT || 8600;
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to db & running on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
