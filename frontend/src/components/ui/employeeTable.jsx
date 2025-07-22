import React from "react";
import { For, HStack, Stack, Table, TableCell } from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../../constanst/global_variable";
import toast from "react-hot-toast";
import { queryClient } from "../../../utils/queryClients.js";

const employeeTable = ({data})=>{

    if(!data.length){
        return <h1>You don't Have Employee data!!</h1>
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Mutation = useMutation({
        mutationFn: async (id) =>{
            const response = await fetch(baseUrl + '/' +id,{
                method: "DELETE",
                headers: {
                    "Content-Type":"application/JSON"
                }
            });
            const data  = await response.json();
            if(!response.ok){
                throw new Error(data.error)
            }
            return data;
        },
        onError: (error)=> {
            console.log(error.response);
            // toast.error(error.message)
        },
        onSuccess: ()=>{
          toast.success("Employee details deleted!");
          queryClient.invalidateQueries({queryKey: ["employee_details"]});
        }
    })

    return (
          <>
      <Stack gap="10">
        <Table.Root size="md" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Age</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Salary</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.age}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>{item.salary}</Table.Cell>
                <Table.Cell>
                  <HStack gap="3">
                  <AiTwotoneDelete size={20} className="icon" onClick={()=> Mutation.mutate(item.id)} />
                  <MdOutlineModeEdit size={20} className="icon" />
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </>
    )
}


export default employeeTable;