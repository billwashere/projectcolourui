import React from 'react';
import {
    Show,
    ShowButton,
    SimpleShowLayout,
   // RichTextField,
    DateField,
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
const EntityFilter = props => (
    <Filter {...props}>
         <TextInput label="Search" source="id" alwaysOn />
        <ReferenceInput
            label="entity"
            source="id"
            reference="entity"
            allowEmpty
        >
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
        <Datagrid>
            <TextField source="id" />
            <ReferenceField label="Entity Type" source="entity_type_id" reference="entity_type">
                <TextField source="name" />
            </ReferenceField>
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
            <TextField source="name" />
            <DateField label="Start Date" source="start_date" />
            <DateField label="End Date" source="end_date" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const EntityTitle = ({ record }) => {
    return <span>Post {record ? `"${record.name}"` : ''}</span>;
};

export const EntityEdit = props => (
    <Edit title={<EntityTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput label="Entity Type" source="entity_type_id" reference="entity_type">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const EntityCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="Entity Type" source="entity_type_id" reference="entity_type">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" />
            <DateField label="Start Date" source="start_date" />
            <DateField label="End Date" source="end_date" />
        </SimpleForm>
    </Create>
);

export const EntityShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="entity_type_id" />
            <DateField label="Start Date" source="start_date" />
            <DateField label="End Date" source="end_date" />
        </SimpleShowLayout>
    </Show>
);