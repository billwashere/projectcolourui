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
  EmailField,
  EditButton,
  ReferenceInput,
  PasswordInput,
  SimpleForm,
  TextInput,
  Filter,
  DateInput,
  AutocompleteInput,
  FormDataConsumer,
  ArrayField
} from "react-admin";

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const TagsField = ({ record }) => (
  <div>
      {record.allocations ? <table> <tr>{ record.allocations.map(item => (
          <th>{item.month}</th>
      )) }  </tr> <tr>{ record.allocations.map(item => (
        <th style={item.allocation > 1 ? {color:"red"} :{color:"green"}}>{item.allocation}</th>
    )) }</tr> </table> : <div>No allocations</div>}
  </div>
)
TagsField.defaultProps = { addLabel: true };

const EditEntityButton = ({ record }) => (
  <Button
      component={Link}
      to={{
          pathname: `/entity/${record.id}/show`,
      }}
  >
      Edit
  </Button>
);

export const ExceptionList = props => (
  <List {...props}>
    <Datagrid >
    <ReferenceField source="id" reference="entity" >
        <TextField source="name" />
      </ReferenceField>
      
     
      <TagsField source="allocations"></TagsField>

      <EditEntityButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ""}</span>;
  };
  
  export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <ReferenceInput source="entity_id" reference="entity"  filter={{ entity_type_id: [3] }} >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      </SimpleForm>
    </Edit>
  );

  export const UserCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <ReferenceInput source="entity_id" reference="entity"  filter={{ entity_type_id: [3] }} >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      </SimpleForm>
    </Create>
  );
  
  export const UserShow = props => (
    <Show {...props}>
      <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <ReferenceField source="entity_id" reference="entity">
        <TextField source="name" />
      </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );