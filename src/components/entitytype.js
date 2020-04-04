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
  ReferenceManyField
} from "react-admin";
//fix me
const Entity_typeFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
  </Filter>
);

export const Entity_typeList = props => (
  <List {...props} filters={<Entity_typeFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="created" />
      <TextField source="updated" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const Entity_typeTitle = ({ record }) => {
  return <span>Entity Type {record ? `"${record.name}"` : ""}</span>;
};

export const Entity_typeEdit = props => (
  <Edit title={<Entity_typeTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const Entity_typeCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const Entity_typeShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceManyField
        label="History"
        reference="entity_type"
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
