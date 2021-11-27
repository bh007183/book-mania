import logo from './logo.svg';
import './App.css';
import Dashboard from "./pages/Dashboard"
import Login from "./pages/login"
import Create from "./pages/create"
import {Provider} from "react-redux"
import configureStore from "./state/configureStore"
import Nav from "./components/nav"
import ManageAccount from "./pages/ManageAccount"
import NoMatch from "./pages/NoMatch"

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Router>
        <Nav/>
        <Routes>
         
          <Route exact path="/dashboard" element={<Dashboard protect={true}/>}/>
          <Route exact path="/manage-account" element={<ManageAccount/>}/>
         
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/create-account" element={<Create/>}/>
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </Router>
    
    </Provider>
  );
}

export default App;
