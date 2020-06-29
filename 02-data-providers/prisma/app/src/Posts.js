import * as React from "react";
import {
  Create,
  Datagrid,
  Edit,
  Filter,
  List,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="authorId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="content" />
    </SimpleForm>
  </Create>
);

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="authorId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="content" />
    </SimpleForm>
  </Edit>
);

export const PostList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="authorId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
    </Datagrid>
  </List>
);
