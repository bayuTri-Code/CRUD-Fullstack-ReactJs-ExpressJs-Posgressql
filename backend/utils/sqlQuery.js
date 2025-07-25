export const createRolePlayQuery = `
    CREATE TYPE type_role AS ENUM('Manager','Developer','HR','Sales','Intern');
`

export const createEmployeeTableQuery = `
    CREATE TABLE employee_details(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        age SMALLINT NOT NULL CHECK (age > 17),
        role type_role NOT NULL DEFAULT 'Intern',
        salary DECIMAL(8,2) NOT NULL
    );
`;

export const getAllEmployeeQuery = `
    SELECT * FROM employee_details
`;

export const createEmployeeQuery = `
    INSERT INTO employee_details(name, email, age, role, salary)
    VALUES($1,$2,$3,COALESCE($4::type_role, 'Intern'::type_role),$5) RETURNING *
`;

export const getEmployeeQuery = `
    SELECT * FROM employee_details WHERE id=$1
`;

export const deleteEmployeeQuery = `
    DELETE FROM employee_details WHERE id=$1
`;

export const updateEmployeeQuery = `
    UPDATE employee_details
    SET
    name = COALESCE($1,name),
    email = COALESCE($2,email),
    age = COALESCE($3,age),
    role = COALESCE($4::type_role,role),
    salary = COALESCE($5,salary)
    WHERE id = $6
    RETURNING * 
`

