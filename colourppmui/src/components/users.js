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
  AutocompleteInput,
  ReferenceManyField,
  Toolbar,
  SaveButton,
  BooleanField,
  BooleanInput
} from "react-admin";
import DeleteWithUndoButton from "./DeleteWithUndoButton";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const ToolbarCustomButton = ({
  handleSubmit,
  handleSubmitWithRedirect,
  onSave,
  invalid,
  pristine,
  saving,
  submitOnEnter,
  ...rest
}) => <DeleteWithUndoButton {...rest} />;

const CustomToolbar = ({ permissions, ...props }) => (
  <Toolbar {...props} classes={useStyles()}>
    <SaveButton />
    {permissions === "su" && <ToolbarCustomButton {...props} />}
  </Toolbar>
);
export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <ReferenceField source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="updated" />
      <BooleanField source="deleted" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ""}</span>;
};

export const UserEdit = ({ permissions, ...props }) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm toolbar={<CustomToolbar permissions={permissions} />}>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="email" />
      <PasswordInput source="password" />
      <ReferenceInput
        source="entity_id"
        reference="entity"
        filter={{ entity_type_id: [3] }}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <PasswordInput source="password" />
      <ReferenceInput
        source="entity_id"
        reference="entity"
        filter={{ entity_type_id: [3] }}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <ReferenceField source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceManyField
        label="History"
        reference="users_log"
        target="object_id"
      >
        <Datagrid>
          <TextField source="diff" />
          <TextField source="action_tstamp_clk" />
          <TextField source="action" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
