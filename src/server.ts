import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Group 5 Backend API Running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});