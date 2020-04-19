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
  ReferenceManyField,
  Toolbar,
  SaveButton
} from "react-admin";
import { useQueryWithStore, Loading, Error } from "react-admin";
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
const AssoicationFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
    <ReferenceInput
      label="Assoication"
      source="id"
      reference="assoication"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="Assoication_type"
      source="assoication_type_id"
      reference="assoication_type"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="Entity from"
      source="entitya_id"
      reference="entity"
      allowEmpty
      filterToQuery={searchText => ({ name: searchText })}
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="Entity to"
      source="entityb_id"
      reference="entity"
      filterToQuery={searchText => ({ name: searchText })}
      allowEmpty
    >
      <AutocompleteInput optionText="name" />
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
  return <span>Assoication {record ? `"${record.id}"` : ""}</span>;
};

export const AssoicationEdit = ({ permissions, ...props }) => (
  <Edit title={<AssoicationTitle />} {...props}>
    <SimpleForm toolbar={<CustomToolbar permissions={permissions}  />}>
      <TextInput source="id" disabled />
      <ReferenceField  label="Assoication Type"
        source="assoication_type_id"
        reference="assoication_type">
        <TextField source="name" />
      </ReferenceField>
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
      <EntityFields />
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
      <DateInput label="Start Date" source="start_date" />
      <DateInput label="End Date" source="end_date" />
      <EntityFields />
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

function createEntityFilter(formData, data, field) {
  if (!("assoication_type_id" in formData)) return {};
  try {
    const res = data.filter(
      result => result.id === formData["assoication_type_id"]
    );
    if (res.length === 0) {
      return {};
    }
    console.log({ entity_type_id: res[0][field] });
    return { entity_type_id: res[0][field] };
  } catch (e) {
    console.log("e");
    console.log(e);
    return {};
  }
}

const EntityFields = ({ record }) => {
  const { loaded, error, data } = useQueryWithStore({
    type: "getList",
    resource: "assoication_type",
    payload: { pagination: { page: 1, perPage: 1000 }, filter: {} }
  });
  if (!loaded) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <FormDataConsumer>
      {({ formData, ...rest }) => (
        <>
          {" "}
          {"assoication_type_id" in formData ? (
            <>
              <ReferenceInput
                label="From Entity"
                source="entitya_id"
                reference="entity"
                filterToQuery={searchText => ({ name: searchText })}
                filter={createEntityFilter(formData, data, "entitya_type_id")}
              >
                <AutocompleteInput optionText="name" />
              </ReferenceInput>
              <ReferenceInput
                label="To Entity"
                source="entityb_id"
                reference="entity"
                filterToQuery={searchText => ({ name: searchText })}
                filter={createEntityFilter(formData, data, "entityb_type_id")}
              >
                <AutocompleteInput optionText="name" />
              </ReferenceInput>
            </>
          ) : (
            <div>Select type first!</div>
          )}
        </>
      )}
    </FormDataConsumer>
  );
};
