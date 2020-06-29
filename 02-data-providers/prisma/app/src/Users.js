import * as React from "react";
import {
  Create,
  Datagrid,
  EmailField,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
