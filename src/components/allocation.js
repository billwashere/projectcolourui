import React from "react";
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  DateInput,
  TextField,
  EditButton,
  SimpleForm,
  TextInput,
  Filter
} from "react-admin";
//fix me
const AllocationFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
  </Filter>
);

export const AllocationList = props => (
  <List {...props} filters={<AllocationFilter />}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Entity A" source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Entity b" source="entityb_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="start_date" />
      <TextField source="end_date" />
      <TextField source="allocation" />
      <TextField source="commitment" />
      <TextField source="created" />
      <TextField source="updated" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const AllocationTitle = ({ record }) => {
  return <span>Allocation {record ? `"${record.id}"` : ""}</span>;
};

export const AllocationEdit = props => (
  <Edit title={<AllocationTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput label="Entity A" source="entity_id" reference="entity">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Entity b" source="entityb_id" reference="entity">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput source="allocation" />
      <TextInput source="commitment" />
    </SimpleForm>
  </Edit>
);

export const AllocationCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Entity A" source="entity_id" reference="entity">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Entity b" source="entityb_id" reference="entity">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput source="allocation" />
      <TextInput source="commitment" />
    </SimpleForm>
  </Create>
);

export const AllocationShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField label="Entity A" source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Entity b" source="entityb_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="start_date" />
      <TextField source="end_date" />
      <TextField source="allocation" />
      <TextField source="commitment" />
      <TextField source="created" />
      <TextField source="updated" />
    </SimpleShowLayout>
  </Show>
);
