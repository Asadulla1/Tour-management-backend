// main application file work for communicate with backend
import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.json("Working Mamu!!!!!");
});
export default app;
