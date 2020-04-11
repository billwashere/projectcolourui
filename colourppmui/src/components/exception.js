import React from "react";
import {
  List,
  Datagrid,
  ReferenceField,
  TextField
} from "react-admin";

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const CreateRelatedCommentButton = ({ item }) => (
  <Button
      component={Link}
      to={{
          pathname: '/allocation',
          state: item ? { filter: { id: item.id } } : {},
      }}
  >
      {item ? item.allocation : 0}
  </Button>
);

const TagsField = ({ record }) => (
  <div>
      {record.allocations ? <table> <tr>{ record.allocations.map(item => (
          <th>{item.month}</th>
      )) }  </tr> <tr>{ record.allocations.map(item => (
        <th style={item.allocation > 1 ? {color:"red"} :{color:"green"}}>{item ? item.allocation : 0}</th>
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