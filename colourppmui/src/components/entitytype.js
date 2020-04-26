import React from "react";
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  TextInput,
  Filter,
  ReferenceManyField,
  BooleanField,
  BooleanInput,
  Toolbar,
  SaveButton,
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
//fix me
const Entity_typeFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
  </Filter>
);

export const Entity_typeList = (props) => (
  <List {...props} filters={<Entity_typeFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="allow_allocation" />
      <BooleanField source="allow_loaded_cost" />
      <BooleanField source="is_resource" />
      <BooleanField source="deleted" />
      <TextField source="created" />
      <TextField source="updated" />
      <TextField source="layout" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const Entity_typeTitle = ({ record }) => {
  return <span>Entity Type {record ? `"${record.name}"` : ""}</span>;
};

export const Entity_typeEdit = ({ permissions, ...props }) => (
  <Edit title={<Entity_typeTitle />} {...props}>
    <SimpleForm  toolbar={<CustomToolbar permissions={permissions}  />}>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <BooleanInput source="allow_allocation" />
      <BooleanInput source="allow_loaded_cost" />
      <BooleanInput source="is_resource" />
      <TextInput source="layout"  parse={v => JSON.parse(v)}
    format={v => JSON.stringify(v)} fullWidth={true}
    multiline={true} />
      {permissions === 'su' ? <BooleanInput source="deleted" /> : <></>}
    </SimpleForm>
  </Edit>
);

export const Entity_typeCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <BooleanInput source="allow_allocation" />
      <BooleanInput source="allow_loaded_cost" />
      <BooleanInput source="is_resource" />
      <TextInput source="layout"  parse={v => JSON.parse(v)}
    format={v => JSON.stringify(v)} fullWidth={true}
    multiline={true} />
    </SimpleForm>
  </Create>
);

export const Entity_typeShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="allow_allocation" />
      <BooleanField source="allow_loaded_cost" />
      <BooleanField source="is_resource" />
      <BooleanField source="deleted" />
      <TextField source="layout"  parse={v => JSON.parse(v)}
    format={v => JSON.stringify(v)} fullWidth={true}
    multiline={true} />
      <ReferenceManyField
        label="History"
        reference="entity_type_log"
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
