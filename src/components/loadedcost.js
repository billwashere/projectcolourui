import React from 'react';
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
    //ReferenceManyField,
    TextField,
    EditButton,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
} from 'react-admin';
//fix me
const Loaded_costFilter = props => (
    <Filter {...props}>
         <TextInput label="Search" source="id" alwaysOn />
        {/*<ReferenceInput
            label="Loaded_cost"
            source="id"
            reference="Loaded_cost"
            allowEmpty
        >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
            label="Loaded_cost_type"
            source="Loaded_cost_type_id"
            reference="Loaded_cost_type"
            allowEmpty
        >
            <SelectInput optionText="name" />
        </ReferenceInput>*/}
    </Filter>
);

export const Loaded_costList = props => (
    <List {...props} filters={<Loaded_costFilter />}>
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

            {/*
            <ReferenceManyField
                label="Comments"
                reference="comments"
                target="postId"
            >
                <Datagrid>
                    <DateField source="created_at" />
                    <TextField source="comment" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <EditButton />
                </Datagrid>
</ReferenceManyField>*/}
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
            <TextInput source="currency" />
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
            <TextInput source="cost" />
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