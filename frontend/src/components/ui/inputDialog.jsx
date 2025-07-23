import React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
} from "@chakra-ui/react";

import { Field } from "./field.jsx";
import { VStack } from "@chakra-ui/react";
import SelectRole from "./selectRole.jsx";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { BaseUrl } from "../../../constanst/global_variable.js";
import { queryClient } from "../../../utils/queryClients.js";


export const InputDialog = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    age: "",
    salary: "",
    role: "",
  });
  function handleChange(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  console.log(info);
   const mutation = useMutation({
  mutationFn: async (info) => {
    const response = await fetch(BaseUrl, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('Response:', response);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  },
  onError: (error) => {
    toast.error(error.message);
  },
  onSuccess: (data) => {
    console.log(data);
    toast.success("Employee details added!");
    queryClient.invalidateQueries({ queryKey: ["employee_details"] });
  }
});

  const requiredFields = ["name", "age", "email", "salary"];
  function handleeSubmit() {
    for (const key of requiredFields) {
      if (!info[key].trim()) {
        toast.error("Missing Fields!!");
        return;
      }
    }
    mutation.mutate({...info, role: info.role || null});
  }

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline">Add Employee </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add Data Employee</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={4} alignItems={"flex-start"}>
                <Field label="Username" required>
                  <input
                    name="name"
                    placeholder="input username"
                    value={info.name}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    placeholder="input email"
                    value={info.email}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Age" required>
                  <input
                    name="age"
                    placeholder="input age"
                    type="number"
                    value={info.age}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Salary" required>
                  <input
                    name="salary"
                    placeholder="input salary"
                    value={info.salary}
                    onChange={handleChange}
                  />
                </Field>
                <SelectRole setInfo={setInfo} />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleeSubmit}>Add</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default InputDialog;
