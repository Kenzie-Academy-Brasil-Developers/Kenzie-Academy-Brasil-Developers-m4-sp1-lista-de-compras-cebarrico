import express, { Application } from "express";
import {
  createList,
  getAllLists,
  getList,
  deleteList,
  getItemList,
  deleteItemList,
} from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/purchase-list", createList);
app.get("/purchase-list", getAllLists);
app.get("/purchase-list/:id", getList);
app.delete("/purchase-list/:id", deleteList);
app.patch("/purchase-list/:id/:name", getItemList);
app.delete("/purchase-list/:id/:name", deleteItemList);

const PORT: number = 3000;
const runningMessage = `Server is Running on http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(runningMessage);
});
