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

import MyUrlField from "./MyUrlField";

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
      <TextField source="phone" />
      <MyUrlField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>
);
