import { query } from "../utils/ConnectDb.js";
import {
  getEmployeeQuery,
  createEmployeeTableQuery,
  createRolePlayQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
  deleteEmployeeQuery,
  updateEmployeeQuery,
} from "../utils/sqlQuery.js";
import { createErrror } from "../utils/error.js";

export async function getAllEmployee(req, res, next) {
  try {
    const response = await query(`SELECT to_regclass('employee_details')`);
    console.log(response);

    if (!response.rows[0].to_regclass) {
      await query(createRolePlayQuery);
      await query(createEmployeeTableQuery);
    }
    const { rows } = await query(getAllEmployeeQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    return next(createErrror(400, "Could't get employee details"));
  }
}
export async function getEmployee(req, res, next) {
  const id = req.params.id;
  const data = await query(getEmployeeQuery, [id]);
  console.log(data);
  if (!data.rows.length) {
    return next(createErrror(400, "Employee Not Found!"));
  }
  res.status(200).json(data.rows[0]);
}

export async function deleteEmployee(req, res, next) {
  const id = req.params.id;
  const data = await query(deleteEmployeeQuery, [id]);
  console.log(data);
  if (!data.rowCount) {
    return next(createErrror(400, "Employee Not Found!"));
  }
  res.status(200).json({ message: "DELETE SUCCSESSFULLY" });
}
export async function updateEmployee(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;
    const result = await query(updateEmployeeQuery, [name,email,age,role,salary,id]);
    if(result.rowCount === 0){
      return res.status(400).json({Error: "Employee Not Found!"});
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export async function createEmployee(req, res, next) {
  try {
    const { name, role, salary, age, email } = req.body;

    if (!name || !role || !salary || !age || !email) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const data = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ]);
    res.status(201).json(data.rows[0]);
  } catch (error) {
    console.log(error.message);
    return next(createErrror(400, error.message));
  }
}
