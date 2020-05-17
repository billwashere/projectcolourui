import React, { Component } from "react";
import history from "./utils/history";
import { Admin, Resource, ListGuesser } from "react-admin";
import buildHasuraProvider from "ra-data-hasura-graphql";
import { Route } from 'react-router-dom';
import {
  EntityList,
  EntityCreate,
  EntityShow,
  EntityEdit,
} from "./components/entity";
import {
  Entity_typeList,
  Entity_typeCreate,
  Entity_typeShow,
  Entity_typeEdit,
} from "./components/entitytype";
import {
  Assoication_typeList,
  Assoication_typeCreate,
  Assoication_typeShow,
  Assoication_typeEdit,
} from "./components/assoicationtype";
import {
  LoadedCostList,
  Loaded_costCreate,
  Loaded_costShow,
  Loaded_costEdit,
} from "./components/loadedcost";
import {
  AssoicationList,
  AssoicationCreate,
  AssoicationShow,
  AssoicationEdit,
} from "./components/assoication";
import {
  AllocationCreate,
  AllocationEdit,
  AllocationList,
  AllocationShow,
} from "./components/allocation";

import exception from "./components/exceptionold/";
import exception2 from "./components/exception/";
import { UserList, UserEdit, UserCreate, UserShow } from "./components/users";
import authProvider from "./authProvider";
import dashboard from "./components/dashboard";
import LinearProgress from "@material-ui/core/LinearProgress";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import UserIcon from "@material-ui/icons/People";
import { createMuiTheme } from "@material-ui/core/styles";
import ApolloClient from "apollo-boost";
import { ColourDataProvider } from "./ColourDataProvider";
import profile from "./components/profile";
import MyLayout from './MyLayout';
//import MyLoginPage from "./components/MyLoginPage";
import { parseJwt } from "./utils/parsejwt";
import { __schema as schema } from "./schema3.json";

const theme = createMuiTheme({
  palette: {
    type: "light", // Switching the dark mode on is a single property value change.
  },
});

const hasuraUrl = process.env.WEBPACK_DEV_SERVER
  ? "/v1/graphql"
  : "https://colour.heisamachine.com/v1/graphql";

console.log(process.env.WEBPACK_DEV_SERVER);

const client = new ApolloClient({
  uri: hasuraUrl,
  request: (operation) => {
    const token = localStorage.getItem("username");
    const perm = localStorage.getItem("permissions");
    const id = localStorage.getItem("id");
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : "",
          "X-Hasura-Role": perm,
          "X-Hasura-User-Id": id,
        },
      });
    } else {
      operation.setContext({
        headers: {
          "x-hasura-admin-secret": "davina93!",
        },
      });
    }
  },
});

function perm_map(perm) {
  if (perm === "su") {
    return [
      <Resource
        options={{ label: "Resource Exceptions" }}
        name="vs_allocation_exception"
        list={exception.list}
      />,
      <Resource
        options={{ label: "Project Exceptions" }}
        name="vs_project_allocation"
        list={exception.list}
      />,

      <Resource
        name="entity"
        list={EntityList}
        create={EntityCreate}
        edit={EntityEdit}
        show={EntityShow}
      />,
      <Resource name="vw_entity_type" />,
      <Resource name="entity_log" />,
      <Resource name="loaded_cost_log" />,
      <Resource name="assoication_log" />,
      <Resource name="allocation_log" />,
      <Resource name="entity_type_log" />,
      <Resource name="assoication_type_log" />,
      <Resource name="user_log" />,
      <Resource name="currency_log" />,
      <Resource
        name="assoication"
        list={AssoicationList}
        create={AssoicationCreate}
        edit={AssoicationEdit}
        show={AssoicationShow}
      />,
      <Resource
        name="allocation"
        list={AllocationList}
        create={AllocationCreate}
        edit={AllocationEdit}
        show={AllocationShow}
      />,
      <Resource
        name="entity_type"
        list={Entity_typeList}
        create={Entity_typeCreate}
        edit={Entity_typeEdit}
        show={Entity_typeShow}
      />,
      <Resource
        name="assoication_type"
        list={Assoication_typeList}
        create={Assoication_typeCreate}
        edit={Assoication_typeEdit}
        show={Assoication_typeShow}
      />,
      <Resource
        name="loaded_cost"
        icon={MonetizationOnRoundedIcon}
        create={Loaded_costCreate}
        list={LoadedCostList}
        show={Loaded_costShow}
        edit={Loaded_costEdit}
      />,
      <Resource name="currency" icon={AttachMoneyIcon} list={ListGuesser} />,
      <Resource
        name="users"
        icon={UserIcon}
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        create={UserCreate}
      />,
      <Resource name="profile" />,
    ];
  } else {
    return [
      <Resource name="vw_entity_type" />,
      <Resource
        options={{ label: "Resource Exceptions" }}
        name="vs_allocation_exception"
        list={exception.list}
      />,
      <Resource
        options={{ label: "Project Exceptions" }}
        name="vs_project_allocation"
        list={exception.list}
      />,

      <Resource
        name="entity"
        list={EntityList}
        create={EntityCreate}
        edit={EntityEdit}
        show={EntityShow}
      />,
      <Resource name="entity_log" />,
      <Resource name="loaded_cost_log" />,
      <Resource name="assoication_log" />,
      <Resource name="allocation_log" />,
      <Resource name="entity_type_log" />,
      <Resource name="assoication_type_log" />,
      <Resource name="user_log" />,
      <Resource name="currency_log" />,
      <Resource
        name="assoication"
        list={AssoicationList}
        create={AssoicationCreate}
        edit={AssoicationEdit}
        show={AssoicationShow}
      />,
      <Resource
        name="allocation"
        list={AllocationList}
        create={AllocationCreate}
        edit={AllocationEdit}
        show={AllocationShow}
      />,
      <Resource
        name="entity_type"
        list={Entity_typeList}
        show={Entity_typeShow}
      />,
      <Resource
        name="assoication_type"
        list={Assoication_typeList}
        show={Assoication_typeShow}
      />,
      <Resource
        name="loaded_cost"
        show={Loaded_costShow}
        create={Loaded_costCreate}
        show={Loaded_costShow}
        edit={Loaded_costEdit}
      />,
      <Resource name="currency" icon={AttachMoneyIcon} />,
      ,
      <Resource name="users" icon={UserIcon} list={UserList} />,
      <Resource name="profile" />,
    ];
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    const token = localStorage.getItem("username");

    const jwtDecoded = parseJwt(token) || { exp: 0 };
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
    if (jwtDecoded.exp - nowUnixSeconds <= 120) {
      localStorage.removeItem("username");
    }
    buildHasuraProvider({
      client: client, //,  introspection: { schema }
    }).then((dataProvider) =>
      this.setState({ dataProvider: ColourDataProvider(dataProvider) })
    );
  }
  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <>
          <LinearProgress />
          <div>Loading...</div>
        </>
      );
    }
    return (
      <Admin
        //loginPage={}MyLoginPage
        history={history}
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={dashboard}
        appLayout={MyLayout}
        customRoutes={[
          <Route
            key="my-profile"
            path="/my-profile"
            component={profile.edit}
          />,
        ]}
      >
        {(permissions) => perm_map(permissions)}
      </Admin>
    );
  }
}

export default App;
