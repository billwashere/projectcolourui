import React from 'react';
import {
    Show,
    ShowButton,
    SimpleShowLayout,
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    EditButton,
    SimpleForm,
    TextInput,
    Filter,
} from 'react-admin';
//fix me
const Assoication_typeFilter = props => (
    <Filter {...props}>
         <TextInput label="Search" source="id" alwaysOn />
       
    </Filter>
);

export const Assoication_typeList = props => (
    <List {...props} filters={<Assoication_typeFilter />}>
        <Datagrid>
            <TextField source="id" />  
            <TextField source="name" />
            <ReferenceField source="entitya_type_id" reference="entity_type">
                        <TextField source="name" />
            </ReferenceField>   
            <ReferenceField source="entityb_type_id" reference="entity_type">
                        <TextField source="name" />
            </ReferenceField>    
            <TextField source="created" /> 
            <TextField source="updated" />  
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const Assoication_typeTitle = ({ record }) => {
    return <span>Assoication Type {record ? `"${record.name}"` : ''}</span>;
};

export const Assoication_typeEdit = props => (
    <Edit title={<Assoication_typeTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
            <ReferenceField source="entitya_type_id" reference="entity_type">
                        <TextField source="name" />
            </ReferenceField>   
            <ReferenceField source="entityb_type_id" reference="entity_type">
                        <TextField source="name" />
            </ReferenceField>   
        </SimpleForm>
    </Edit>
);

export const Assoication_typeCreate = props => (
    <Create {...props}>
        <SimpleForm>
        
            <TextInput source="name" />
            <ReferenceInput source="entitya_type_id" reference="entity_type">
                        <SelectInput source="name" />
            </ReferenceInput>   
            <ReferenceInput source="entityb_type_id" reference="entity_type">
                        <SelectInput source="name" />
            </ReferenceInput> 
        </SimpleForm>
    </Create>
);

export const Assoication_typeShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
        <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="entitya_type_id" reference="entity_type">
                        <TextField source="name" />
            </ReferenceField>   
            <ReferenceField source="entityb_type_id" reference="entity_type">
                        <TextField source="name" />
            </ReferenceField>   
        </SimpleShowLayout>
    </Show>
);