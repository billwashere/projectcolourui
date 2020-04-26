import React from "react";
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  DateInput,
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
  ReferenceManyField,
  AutocompleteInput,
  Toolbar,
  SaveButton,
  BooleanField,
  BooleanInput
} from "react-admin";
import DeleteWithUndoButton from './DeleteWithUndoButton'
import { makeStyles } from '@material-ui/core/styles';
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
//fix me
const LoadedCostFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
  </Filter>
);

export const LoadedCostList = props => (
  <List {...props} filters={<LoadedCostFilter />}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Entity" source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="cost" />
      <ReferenceField label="Currency" source="currency" reference="currency">
        <TextField source="entity" />
      </ReferenceField>
      <TextField source="level" />
      <TextField label="Start Date" source="start_date" />
      <TextField label="End Date" source="end_date" />
      <BooleanField source="deleted" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const LoadedCostTitle = ({ record }) => {
  return <span>Loaded Cost {record ? `"${record.id}"` : ""}</span>;
};

export const Loaded_costEdit = ({ permissions, ...props }) => (
  <Edit title={<LoadedCostTitle />} {...props}>
    <SimpleForm  toolbar={<CustomToolbar permissions={permissions}  />}>
      <TextInput source="id" disabled />
      <ReferenceField label="Entity" source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <TextInput source="cost" />
      <ReferenceInput label="Currency" source="currency" reference="currency">
        <SelectInput optionText="entity" />
      </ReferenceInput>
      <TextInput source="level" />
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
      {permissions === 'su' ? <BooleanInput source="deleted" /> : <></>}
    </SimpleForm>
  </Edit>
);

export const Loaded_costCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Entity" source="entity_id" reference="entity" filterToQuery={searchText => ({ name: searchText })}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Currency" source="currency" reference="currency">
        <SelectInput optionText="entity" />
      </ReferenceInput>
      <TextInput source="cost" />
      <TextInput source="level" />
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
    </SimpleForm>
  </Create>
);

export const Loaded_costShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceField label="Entity" source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Currency" source="currency" reference="currency">
        <TextField source="Entity" />
      </ReferenceField>
      <TextField label="Start Date" source="start_date" />
      <TextField label="End Date" source="end_date" />
    </SimpleShowLayout>
    <ReferenceManyField
        label="History"
        reference="loaded_cost_log"
        target="object_id"
      >
        <Datagrid>
          <TextField source="diff" />
          <TextField source="action_tstamp_clk" />
          <TextField source="action" />
        </Datagrid>
      </ReferenceManyField>
  </Show>
);
