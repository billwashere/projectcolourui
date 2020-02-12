import React from 'react';
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
} from 'react-admin';
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
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const Loaded_costTitle = ({ record }) => {
    return <span>Loaded Cost {record ? `"${record.id}"` : ''}</span>;
};

export const Loaded_costEdit = props => (
    <Edit title={<Loaded_costTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="cost" />
            <ReferenceInput label="Currency" source="currency" reference="currency">
                <SelectInput optionText="entity" />
            </ReferenceInput>
            <TextInput source="level" />
            <DateInput label="Start Date" source="start_date" />
            <DateInput label="End Date" source="end_date" />
        </SimpleForm>
    </Edit>
);

export const Loaded_costCreate = props => (
    <Create {...props}>
        <SimpleForm>
        <ReferenceInput label="Entity" source="entity_id" reference="entity">
                <SelectInput optionText="name" />
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
    </Show>
);