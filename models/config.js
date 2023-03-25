const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://agrimaagarwal722:eMihoQ6bqldrJV2A@cluster0.0xylouq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.log("mongooose Connenction Error", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
