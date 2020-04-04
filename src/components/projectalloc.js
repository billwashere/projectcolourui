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
  ReferenceManyField
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


export const ProjectExceptionList = props => (
  <List {...props}>
    <Datagrid >
    <ReferenceField
        reference="entity"
        target="id"
      >
        <TextField source="name" />
      </ReferenceField>
   
     
      <TagsField source="allocations"></TagsField>

      <EditEntityButton />
    </Datagrid>
  </List>
);
