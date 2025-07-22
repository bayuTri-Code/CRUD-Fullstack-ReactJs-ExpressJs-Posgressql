import express from "express";
const router = express.Router();

import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getEmployee,
  updateEmployee,
} from "../controller/employee.js";

router.get("/", getAllEmployee);

router.post("/", createEmployee);

router.get("/:id", getEmployee);

router.delete("/:id", deleteEmployee);

router.put("/:id", updateEmployee);

export default router;
