import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import employeeRouter from "./routes/employee.js";

dotenv.config();

const app = express();
app.use(express.json());

const Port = 3001;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/employee/", employeeRouter);

app.use(function (req,res){
  res.status(404).json({Error: "Not Found!"});
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({ error: message });
});

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
