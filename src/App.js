import React, { Component }  from "react";
import history from "./utils/history";
import { Admin, Resource, ListGuesser } from "react-admin";
import buildHasuraProvider from "ra-data-hasura-graphql";
import {
  EntityList,
  EntityCreate,
  EntityShow,
  EntityEdit
} from "./components/entity";
import {
  Entity_typeList,
  Entity_typeCreate,
  Entity_typeShow,
  Entity_typeEdit
} from "./components/entitytype";
import {
  Assoication_typeList,
  Assoication_typeCreate,
  Assoication_typeShow,
  Assoication_typeEdit
} from "./components/assoicationtype";
import {
  LoadedCostList,
  Loaded_costCreate,
  Loaded_costShow,
  Loaded_costEdit
} from "./components/loadedcost";
import {
  AssoicationList,
  AssoicationCreate,
  AssoicationShow,
  AssoicationEdit
} from "./components/assoication";
import {
  AllocationCreate,
  AllocationEdit,
  AllocationList,
  AllocationShow
} from "./components/allocation";

import {ExceptionList} from './components/exception'
import {ProjectExceptionList} from './components/projectalloc'
import {UserList,UserEdit, UserCreate, UserShow} from './components/users'
import authProvider from "./authProvider";
import dashboard from "./components/dashboard";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import UserIcon from '@material-ui/icons/People';
import { createMuiTheme } from "@material-ui/core/styles";
import ApolloClient from 'apollo-boost'

const theme = createMuiTheme({
  palette: {
    type: "light" // Switching the dark mode on is a single property value change.
  }
});

const hasuraUrl = "https://colour.heisamachine.com/v1/graphql";


const client = new ApolloClient({
  uri: hasuraUrl,
  request: (operation) => {
    const token = localStorage.getItem('username')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})
class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    buildHasuraProvider({
      client: client
    }).then(dataProvider => this.setState({ dataProvider }));
  }
  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }
    return (
      <Admin
        history={history}
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={dashboard}
      >
        <Resource label="Exceptions" name="vs_allocation_exception" list={ExceptionList} />
        <Resource label="Exceptions" name="vs_project_allocation" list={ExceptionList} />

        <Resource
          name="entity"
          list={EntityList}
          create={EntityCreate}
          edit={EntityEdit}
          show={EntityShow}
        />
         <Resource
          name="entity_log"
        />
         <Resource
          name="loaded_cost_log"
        />   
         <Resource
          name="assoication_log"
        />  
         <Resource
          name="allocation_log"
        />
        <Resource
          name="entity_type_log"
        />
        <Resource
          name="assoication_type_log"
        />
        <Resource
          name="user_log"
        />
        <Resource
          name="currency_log"
        />
        <Resource
          name="assoication"
          list={AssoicationList}
          create={AssoicationCreate}
          edit={AssoicationEdit}
          show={AssoicationShow}
        />
        <Resource
          name="allocation"
          list={AllocationList}
          create={AllocationCreate}
          edit={AllocationEdit}
          show={AllocationShow}
        />
        <Resource
          name="entity_type"
          list={Entity_typeList}
          create={Entity_typeCreate}
          edit={Entity_typeEdit}
          show={Entity_typeShow}
        />
        <Resource
          name="assoication_type"
          list={Assoication_typeList}
          create={Assoication_typeCreate}
          edit={Assoication_typeEdit}
          show={Assoication_typeShow}
        />
        <Resource
          name="loaded_cost"
          icon={MonetizationOnRoundedIcon}
          create={Loaded_costCreate}
          list={LoadedCostList}
          show={Loaded_costShow}
          edit={Loaded_costEdit}
        />
        <Resource name="currency" icon={AttachMoneyIcon} list={ListGuesser} />
        <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} show={UserShow} create={UserCreate} />
      </Admin>
    );
  }
}

export default App;
