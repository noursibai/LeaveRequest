const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
mongoose.connect(
  "mongodb+srv://noursibai:noursibaii@cluster0.nqduea5.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(bodyParser.json());
app.use("/api", apiRoutes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
