import express, { Application } from "express";
import {
  listExist,
  itemExist,
  createList,
  getAllLists,
  getList,
  deleteList,
  updateItemList,
  deleteItemList,
} from "./logic";

const app: Application = express();

app.use(express.json());
app.use("/purchaseList/:id", listExist);
app.use("/purchaseList/:id/:name", itemExist);

app.post("/purchaseList", createList);
app.get("/purchaseList", getAllLists);
app.get("/purchaseList/:id", getList);
app.delete("/purchaseList/:id", deleteList);
app.patch("/purchaseList/:id/:name", updateItemList);
app.delete("/purchaseList/:id/:name", deleteItemList);

const PORT: number = 3000;
const runningMessage = `Server is Running on http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(runningMessage);
});
