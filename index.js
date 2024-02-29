import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const { secret, username } = response.data;
    res.render("index.ejs", { secret, username });
  } catch (error) {
    const message = error.response.data;
    console.log(message);
    res.render("index.ejs", { error: message });
  }
})

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})