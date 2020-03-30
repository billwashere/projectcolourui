import React from "react";
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  DateField,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EmailField,
  EditButton,
  ReferenceInput,
  PasswordInput,
  SimpleForm,
  TextInput,
  Filter,
  DateInput,
  AutocompleteInput,
  FormDataConsumer
} from "react-admin";
export const UserList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <ReferenceField source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="updated" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ""}</span>;
  };
  
  export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <ReferenceInput source="entity_id" reference="entity"  filter={{ entity_type_id: [3] }} >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      </SimpleForm>
    </Edit>
  );

  export const UserCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <ReferenceInput source="entity_id" reference="entity"  filter={{ entity_type_id: [3] }} >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      </SimpleForm>
    </Create>
  );
  
  export const UserShow = props => (
    <Show {...props}>
      <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <ReferenceField source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );