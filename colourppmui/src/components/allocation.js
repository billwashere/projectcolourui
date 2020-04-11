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
  DateInput,
  TextField,
  EditButton,
  SimpleForm,
  TextInput,
  Filter,
  required,
  minValue,
  maxValue,
  number,
  AutocompleteInput
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
      <ReferenceInput
        filter={{ entity_type_id: 2 }}
        label="Entity A"
        source="entity_id"
        reference="entity"
        filterToQuery={searchText => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        filter={{ entity_type_id: [3, 7] }}
        label="Entity b"
        source="entityb_id"
        reference="entity"
        filterToQuery={searchText => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
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
      <ReferenceInput
        filter={{ entity_type_id: 2 }}
        label="Entity A"
        source="entity_id"
        reference="entity"
        filterToQuery={searchText => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        filter={{ entity_type_id: [3, 7] }}
        label="Entity b"
        source="entityb_id"
        reference="entity"
        filterToQuery={searchText => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput
        source="allocation"
        validate={[required(), number(), minValue(0), maxValue(1)]}
        defaultValue={1}
      />
      <TextInput
        source="commitment"
        defaultValue={100}
        validate={[required(), number(), minValue(0), maxValue(100)]}
      />
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
   {/* <ReferenceManyField
        label="History"
        reference="allocation_log"
        target="object_id"
      >
        <Datagrid>
          <TextField source="diff" />
          <TextField source="action_tstamp_clk" />
          <TextField source="action" />
        </Datagrid>
   </ReferenceManyField> */}
  </Show>
);
