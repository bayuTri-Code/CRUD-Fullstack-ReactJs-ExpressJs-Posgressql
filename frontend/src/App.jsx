import { VStack } from "@chakra-ui/react";
import React from "react";
import EmployeeTable from "./components/ui/employeeTable";
import { useQuery } from "@tanstack/react-query";
import { BaseUrl } from "../constanst/global_variable.js";
import { InputDialog } from "./components/ui/inputDialog.jsx";
import { DialogTrigger } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  async function fetchEmployeeDetails(params) {
    const res = await fetch(BaseUrl);
    const data = await res.json();
    if (!res.ok) {
      throw new error(data.error);
    }
    return data;
  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,
  });

  if (isPending) return "Loading";
  if (isError) return error.message;

  console.log("data from postgre db:", data);

  return (
    <>
      <VStack gap="6" alignItems="flex-start">
        <InputDialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Employee </Button>
          </DialogTrigger>
        </InputDialog>
        <EmployeeTable data={data} />
      </VStack>
    </>
  );
};

export default App;
