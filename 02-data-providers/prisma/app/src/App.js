import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
// import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import authProvider from './authProvider';
// import dataProvider from './dataProvider';
import Dashboard from './Dashboard';
// import { PostCreate, PostEdit, PostList } from "./Posts";
import { UserList } from "./Users";

// Setup data provider
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const dataProvider = jsonServerProvider("http://localhost:3001");

// Create app
const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    {/* <Resource name="posts" create={PostCreate} edit={PostEdit} list={PostList} icon={PostIcon} /> */}
    <Resource name="users" list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;
