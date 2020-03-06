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
  EditButton,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Filter
} from "react-admin";
//fix me
const AssoicationFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
    <ReferenceInput
      label="Assoication"
      source="id"
      reference="Assoication"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="Assoication_type"
      source="Assoication_type_id"
      reference="Assoication_type"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const AssoicationList = props => (
  <List {...props} filters={<AssoicationFilter />}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField
        label="Assoication Type"
        source="assoication_type_id"
        reference="assoication_type"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Entity From"
        source="entitya_id"
        reference="entity"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Entity To" source="entityb_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      
      <DateField label="Start Date" source="start_date" />
      <DateField label="End Date" source="end_date" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const AssoicationTitle = ({ record }) => {
  return <span>Assoication {record ? `"${record.name}"` : ""}</span>;
};

export const AssoicationEdit = props => (
  <Edit title={<AssoicationTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput
        label="Assoication Type"
        source="assoication_type_id"
        reference="assoication_type"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
     
    </SimpleForm>
  </Edit>
);

export const AssoicationCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Assoication Type"
        source="assoication_type_id"
        reference="assoication_type"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput label="Start Date" source="start_date" />
      <TextInput label="End Date" source="end_date" />
      <ReferenceInput
        label="From Entity"
        source="entitya_id"
        reference="entity"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="To Entity" source="entityb_id" reference="entity">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const AssoicationShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="Assoication_type_id" />
      <DateField label="Start Date" source="start_date" />
      <DateField label="End Date" source="end_date" />
    </SimpleShowLayout>
  </Show>
);
