import express from "express";
import cors from "cors";
import ListController from "./controllers/listController.js";
import connection from "./mysql.js";

const port = "3001";
const app = express();

app.use(cors());
app.use(express.json());

const listController = new ListController();

app.post("/list", listController.register);

app.put("/list", listController.updateData);

app.get("/list", listController.getTables);

app.delete("/list/:id", listController.deleteTable);

app.listen(port, () => {
  console.log("we are running, observer in port " + port);
});
