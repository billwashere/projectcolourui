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
    ReferenceManyField,
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
            
           {/*<ReferenceManyField
                label="Asspicated To"
                reference="assoication"
                target="entitya_id"
            >
                <Datagrid>
                <TextField source="assoication_type_id" />
                    <ReferenceField label="Name" source="entityb_id" reference="entity">
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
    return <span>Entity {record ? `"${record.name}"` : ''}</span>;
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
    <Show title={<EntityTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="entity_type_id" />
            <DateField label="Start Date" source="start_date" />
            <DateField label="End Date" source="end_date" />
            <ReferenceManyField
                label="Assoication To"
                reference="assoication"
                target="entitya_id"
            >
                <Datagrid>
                <TextField source="assoication_type_id" />
                <ReferenceField label="Assoication Type" source="assoication_type_id" reference="assoication_type">
                <TextField source="name" />
            </ReferenceField>
                    <ReferenceField label="Name" source="entityb_id" reference="entity">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="start_date" />
                    <TextField source="end_date" />
                    <EditButton />
                </Datagrid>
</ReferenceManyField>
<ReferenceManyField
                label="Assoication from"
                reference="assoication"
                target="entityb_id"
            >
                <Datagrid>
                <TextField source="assoication_type_id" />
                <ReferenceField label="Assoication Type" source="assoication_type_id" reference="assoication_type">
                <TextField source="name" />
            </ReferenceField>
                    <ReferenceField label="Name" source="entitya_id" reference="entity">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="start_date" />
                    <TextField source="end_date" />
                    <EditButton />
                </Datagrid>
</ReferenceManyField>
<ReferenceManyField
                label="Cost Rates"
                reference="loaded_cost"
                target="entity_id"
            >
                <Datagrid>
                <TextField source="cost" />
                <TextField source="currency" />
                {/*<ReferenceField source="currency" reference="currencies">
                        <TextField source="Entity" />
                    </ReferenceField> */}
                    <TextField source="start_date" />
                    <TextField source="end_date" />
                    <EditButton />
                </Datagrid>
</ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);