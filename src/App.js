import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import hasuraDataProvider from 'ra-data-hasura';
import { EntityList, EntityCreate, EntityShow, EntityEdit } from './components/entity'
import { AssoicationList, AssoicationCreate, AssoicationShow, AssoicationEdit } from './components/assoication'
import authProvider from './authProvider';
import dashboard from './components/dashboard';


const hasuraUrl = 'https://colourppm.herokuapp.com';
const headers = {}
const App = () => (
    <Admin
        dataProvider={hasuraDataProvider(hasuraUrl, headers)}
        authProvider={authProvider}
        dashboard={dashboard}
    >
        <Resource name="entity" list={EntityList} create={EntityCreate} edit={EntityEdit} show={EntityShow} />
        <Resource name="assoication" list={AssoicationList} create={AssoicationCreate} edit={AssoicationEdit} show={AssoicationShow} />
        <Resource name="allocation" list={ListGuesser} />
        <Resource name="entity_type" list={ListGuesser} />
        <Resource name="assoication_type" list={ListGuesser} />
        <Resource name="loaded_cost" list={ListGuesser} />
        <Resource name="currency" list={ListGuesser} />
    </Admin>
);
export default App;