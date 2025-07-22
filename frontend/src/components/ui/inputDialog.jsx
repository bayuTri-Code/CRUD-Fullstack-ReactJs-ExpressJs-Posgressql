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

export const InputDialog = () => {
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
                  <input name="name" placeholder="input username" />
                </Field>
                <Field label="Email" required>
                  <input name="email" placeholder="input email" />
                </Field>
                <Field label="Age" required>
                  <input name="age" placeholder="input age" />
                </Field>
                <Field label="Salary" required>
                  <input name="salary" placeholder="input salary" />
                </Field>
                <SelectRole />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
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
