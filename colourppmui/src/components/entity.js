import React from "react";
import {
  Show,
  SimpleShowLayout,
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
  Pagination,
  Toolbar,
  SaveButton, BooleanField, BooleanInput
} from "react-admin";
import { useQueryWithStore, Loading, Error } from "react-admin";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import DeleteWithUndoButton from './DeleteWithUndoButton'
const useStyles = makeStyles({
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
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

const CustomToolbar = ({ permissions, ...props }) => 
  <Toolbar {...props} classes={useStyles()}>
      <SaveButton />
{permissions === 'su' && <ToolbarCustomButton  {...props}/> }
  </Toolbar>
  ;


const AssoicationButton = () => (
  <Button color="secondary" variant="outlined"
      component={Link}
      to={{
          pathname: `/assoication/create`,
      }}
  >
      New Assoication
  </Button>
);
const AllocationButton = () => (
  <Button color="secondary" variant="outlined"
      component={Link}
      to={{
          pathname: `/allocation/create`,
      }}
  >
      New Allocation
  </Button>
);
const CostRateButton = ({ record }) => (
  <Button color="secondary" variant="outlined"
      component={Link}
      
      to={{
          pathname: `/loaded_cost/create`,
          search: `?source={"entity_id":${record.id}}`,
          state:  { entity_id: record.id }
      }}
  >
      New Create Loaded Cost
  </Button>
);

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
      <BooleanField source="deleted" />
    </Datagrid>
  </List>
);

const EntityTitle = ({ record }) => {
  return <span>Entity {record ? `"${record.name}"` : ""}</span>;
};

export const EntityEdit = ({ permissions, ...props }) => (
  <Edit title={<EntityTitle />} {...props}>
    <SimpleForm toolbar={<CustomToolbar permissions={permissions}  />}>
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
      {permissions === 'su' ? <BooleanInput source="deleted" /> : <></>}
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

const EntityFields = ({ record }) => {
  const { loaded, error, data } = useQueryWithStore({
    type: "getOne",
    resource: "entity_type",
    payload: { id: record.entity_type_id}
  });
  if (!loaded) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

      
  return (<TextField source="name" />)


}

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
      <BooleanField source="deleted" />
      <AssoicationButton />
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
      <AllocationButton />
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
      <CostRateButton />
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
