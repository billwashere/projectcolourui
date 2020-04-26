import React from "react";
import { List, Datagrid, ReferenceField, TextField, Filter, NullableBooleanInput, TextInput, ReferenceInput, SelectInput} from "react-admin";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const TagsField = ({ record }) => (
  <div>
    {record.allocations ? (
      <table>
        {" "}
        <tr>
          {record.allocations.map(item => (
            <th>{item.month}</th>
          ))}{" "}
        </tr>{" "}
        <tr>
          {record.allocations.map(item => (
            <th
              style={
                item.allocation > 1 ? { color: "red" } : { color: "green" }
              }
            >
              {item ? (
                <Button
                  color={item.allocation > 1 ? "secondary" : "primary"}
                  component={Link}
                  to={{
                    pathname: "/allocation",
                    search:
                      '?filter=%7B"ids"%3A' +
                      encodeURIComponent(JSON.stringify(item.id)) +
                      "%7D"
                  }}
                >
                  {item ? item.allocation.toFixed(2) : "No Alloc"}
                </Button>
              ) : (
                0
              )}
            </th>
          ))}
        </tr>{" "}
      </table>
    ) : (
      <div>No allocations</div>
    )}
  </div>
);
TagsField.defaultProps = { addLabel: true };

const EditEntityButton = ({ record }) => (
  <Button
    component={Link}
    to={{
      pathname: `/entity/${record.id}/show`
    }}
  >
    Edit
  </Button>
);

const EntityFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
    <NullableBooleanInput source="deleted" alwaysOn/>
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

export const ExceptionList = props => (
  <List {...props} filters={<EntityFilter />} filterDefaultValues={{ deleted: false }}>
    <Datagrid>
    <TextField source="id" />
    <TextField source="name" />
      <ReferenceField source="entity_type_id" reference="entity_type">
        <TextField source="name" />
      </ReferenceField>
      <TagsField source="allocations"></TagsField>
      <EditEntityButton />
    </Datagrid>
  </List>
);
