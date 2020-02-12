import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import hasuraDataProvider from 'ra-data-hasura';
import { EntityList, EntityCreate, EntityShow, EntityEdit } from './components/entity'
import { Entity_typeList, Entity_typeCreate, Entity_typeShow, Entity_typeEdit } from './components/entitytype'
import { Assoication_typeList, Assoication_typeCreate, Assoication_typeShow, Assoication_typeEdit } from './components/assoicationtype'
import { LoadedCostList, Loaded_costCreate, Loaded_costShow, Loaded_costEdit } from './components/loadedcost'
import { AssoicationList, AssoicationCreate, AssoicationShow, AssoicationEdit } from './components/assoication'
import authProvider from './authProvider';
import dashboard from './components/dashboard';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
//import UserIcon from '@material-ui/icons/People';

const hasuraUrl = 'https://colourppm.herokuapp.com';
const headers = {}
const App = () => (
    <Admin
        dataProvider={hasuraDataProvider(hasuraUrl, headers)}
        authProvider={authProvider}
        dashboard={dashboard}
    >
<Resource name="vw_d_allocation" list={ListGuesser} />

        <Resource name="entity" list={EntityList} create={EntityCreate} edit={EntityEdit} show={EntityShow} />
        <Resource name="assoication" list={AssoicationList} create={AssoicationCreate} edit={AssoicationEdit} show={AssoicationShow} />
        <Resource name="allocation" list={ListGuesser} />
        <Resource name="entity_type"  list={Entity_typeList} create={Entity_typeCreate} edit={Entity_typeEdit} show={Entity_typeShow} />
        <Resource name="assoication_type" list={Assoication_typeList} create={Assoication_typeCreate} edit={Assoication_typeEdit} show={Assoication_typeShow} />
        <Resource name="loaded_cost" icon={MonetizationOnRoundedIcon} create={Loaded_costCreate} list={LoadedCostList} show={Loaded_costShow} edit={Loaded_costEdit} />
        <Resource name="currency" icon={AttachMoneyIcon} list={ListGuesser} />
    </Admin>
);
export default App;