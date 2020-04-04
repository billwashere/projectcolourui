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
  Filter,
  DateInput,
  AutocompleteInput,
  FormDataConsumer,
  ReferenceManyField
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
      <TextInput source="id" disabled />
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <ReferenceInput
            label="From Entity"
            source="entitya_id"
            reference="entity"
            filterToQuery={searchText => ({ name: searchText })}
            filter={valid_from_wrapper(formData)}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        )}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <ReferenceInput
            label="To Entity"
            source="entityb_id"
            reference="entity"
            filterToQuery={searchText => ({ name: searchText })}
            filter={valid_to_wrapper(formData)}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        )}
      </FormDataConsumer>
    </SimpleForm>
  </Edit>
);

function valid_from(formData) {
  if (!("assoication_type_id" in formData)) return [];
  let project_ids = [1, 2, 4, 5, 6, 7, 8];
  let client_ids = [3];
  let team_ids = [9];
  if (project_ids.includes(formData["assoication_type_id"])) {
    return [2];
  }
  if (client_ids.includes(formData["assoication_type_id"])) {
    return [1];
  }
  if (team_ids.includes(formData["assoication_type_id"])) {
    return [7];
  }
  return [];
}

function valid_from_wrapper(formData) {
  let res = valid_from(formData);
  if (res.length === 0) return {};
  return { entity_type_id: res };
}

function valid_to(formData) {
  if (!("assoication_type_id" in formData)) return [];
  let legal_ids = [1, 2];
  let project_ids = [3];
  let resource_ids = [4, 5, 6, 9];
  let rep_ids = [7, 8];
  if (legal_ids.includes(formData["assoication_type_id"])) {
    return [4];
  }
  if (project_ids.includes(formData["assoication_type_id"])) {
    return [2];
  }
  if (resource_ids.includes(formData["assoication_type_id"])) {
    return [3];
  }
  if (rep_ids.includes(formData["assoication_type_id"])) {
    return [5];
  }
  return [];
}

function valid_to_wrapper(formData) {
  let res = valid_to(formData);
  if (res.length === 0) return {};
  return { entity_type_id: res };
}

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
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <ReferenceInput
            label="From Entity"
            source="entitya_id"
            reference="entity"
            filterToQuery={searchText => ({ name: searchText })}
            filter={valid_from_wrapper(formData)}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        )}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <ReferenceInput
            label="To Entity"
            source="entityb_id"
            reference="entity"
            filterToQuery={searchText => ({ name: searchText })}
            filter={valid_to_wrapper(formData)}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        )}
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);

export const AssoicationShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="Assoication_type_id" />
      <DateField label="Start Date" source="start_date" />
      <DateField label="End Date" source="end_date" />
      <ReferenceManyField
        label="History"
        reference="assoication_log"
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
