require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRouter");
const categoriesRoutes = require("./routes/CategoriesRouter");
const brandsRoutes = require("./routes/BrandsRouter");
const productsRoutes = require("./routes/ProductsRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", userRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", brandsRoutes);
app.use("/api", productsRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
