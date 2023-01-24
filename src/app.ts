import express, { Application } from "express";
import { createList, getAllLists } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/purchase-list", createList);
app.get("/purchase-list", getAllLists);

const PORT: number = 3000;
const runningMessage = `Server is Running on http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(runningMessage);
});
