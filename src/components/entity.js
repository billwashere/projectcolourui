import React from "react";
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  // RichTextField,
  DateInput,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  ReferenceManyField,
  TextField,
  EditButton,
  CloneButton,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Filter,
  Pagination
} from "react-admin";

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

//fix me
const EntityFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
    <ReferenceInput label="entity" source="id" reference="entity" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="entity_type"
      source="entity_type_id"
      reference="entity_type"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const EntityList = props => (
  <List {...props} filters={<EntityFilter />}>
    <Datagrid rowClick={(id,basepath,record) => `${basepath}/${id}/show`}>
      <TextField source="id" />
      <ReferenceField
        label="Entity Type"
        source="entity_type_id"
        reference="entity_type"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField label="Start Date" source="start_date" />
      <TextField label="End Date" source="end_date" />
    </Datagrid>
  </List>
);

const EntityTitle = ({ record }) => {
  return <span>Entity {record ? `"${record.name}"` : ""}</span>;
};

export const EntityEdit = props => (
  <Edit title={<EntityTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput
        label="Entity Type"
        source="entity_type_id"
        reference="entity_type"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
    </SimpleForm>
  </Edit>
);

export const EntityCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Entity Type"
        source="entity_type_id"
        reference="entity_type"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
    </SimpleForm>
  </Create>
);

export const EntityShow = props => (
  <Show title={<EntityTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceField
        label="Entity Type"
        source="entity_type_id"
        reference="entity_type"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Start Date" source="start_date" />
      <TextField label="End Date" source="end_date" />
      <ReferenceManyField
        label="Assoication To"
        reference="assoication"
        target="entitya_id"
        pagination={<PostPagination />}
      >
        <Datagrid>
          <TextField source="assoication_type_id" />
          <ReferenceField
            label="Assoication Type"
            source="assoication_type_id"
            reference="assoication_type"
          >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="Name" source="entityb_id" reference="entity">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="start_date" />
          <TextField source="end_date" />
          <EditButton />
          <CloneButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField
        label="Assoication from"
        reference="assoication"
        target="entityb_id"
        pagination={<PostPagination />}
      >
        <Datagrid>
          <TextField source="assoication_type_id" />
          <ReferenceField
            label="Assoication Type"
            source="assoication_type_id"
            reference="assoication_type"
          >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="Name" source="entitya_id" reference="entity">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="start_date" />
          <TextField source="end_date" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField
        reference="allocation"
        target="entityb_id"
        label="Allocations (Resource to Project)"
        pagination={<PostPagination />}
      >
        <Datagrid>
          <TextField source="allocation" />
          <ReferenceField source="entity_id" reference="entity">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="start_date" />
          <TextField source="end_date" />
          <EditButton />
          <CloneButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField
        label="Allocations (Project to Resource)"
        reference="allocation"
        target="entity_id"
        pagination={<PostPagination />}
      >
        <Datagrid>
          <TextField source="allocation" />
          <ReferenceField source="entityb_id" reference="entity">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="start_date" />
          <TextField source="end_date" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField
        label="Cost Rates"
        reference="loaded_cost"
        target="entity_id"
      >
        <Datagrid>
          <TextField source="cost" />
          <TextField source="currency" />
          {/*<ReferenceField source="currency" reference="currencies">
                        <TextField source="Entity" />
                    </ReferenceField> */}
          <TextField source="start_date" />
          <TextField source="end_date" />
          <EditButton />
          <CloneButton />
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="History"
        reference="entity_log"
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
