import React from "react";
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  Filter,
  NullableBooleanInput,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const TagsField = ({ record }) => (
  <div>
    {record.allocations ? (
      <table>
        {" "}
        <tr>
          {record.allocations.map((item) => (
            <th>{item.month}</th>
          ))}{" "}
        </tr>{" "}
        <tr>
          {record.allocations.map((item) => (
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
                    search: stringify({
                      page: 1,
                      perPage: 25,
                      sort: "id",
                      order: "DESC",
                      filter: JSON.stringify({ ids: item.id }),
                    }),
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

const EntityFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
    <NullableBooleanInput source="deleted" alwaysOn />
    <ReferenceInput label="entity" source="id" reference="entity" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="entity_type"
      source="entity_type_id"
      reference="entity_type"
      allowEmpty
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

const ExceptionList = (props) => (
  <List
    {...props}
    filters={<EntityFilter />}
    filterDefaultValues={{ deleted: false }}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="entity_type_id" reference="entity_type">
        <TextField source="name" />
      </ReferenceField>
      <TagsField source="allocations"></TagsField>
    </Datagrid>
  </List>
);

export default ExceptionList;
