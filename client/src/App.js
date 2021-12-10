import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Create from "./pages/create";
import { Provider } from "react-redux";
import configureStore from "./state/configureStore";
import Nav from "./components/nav";
import ManageAccount from "./pages/ManageAccount";
import Notifications from "./pages/Notifications";
import ManageConnection from "./pages/Friends";
import NoMatch from "./pages/NoMatch";
import Browse from "./pages/Browse";

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const store = configureStore();
  return (
    <>
    <div id="rootContain">
      <Provider store={store}>
        <Router>
          <div  style={{ position: "relative" }}>
            <Nav />
            <Routes>
              <Route path="/" element={<Browse />} />
              <Route
                exact
                path="/dashboard"
                element={<Dashboard protect={true} />}
              />
              <Route exact path="/manage-account" element={<ManageAccount />} />
              <Route
                exact
                path="/manage-connections"
                element={<ManageConnection />}
              />
              <Route exact path="/notifications" element={<Notifications />} />
              <Route path="/browse/*" element={<Browse />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/create-account" element={<Create />} />

              <Route path="*" element={<NoMatch />} />
            </Routes>
            
          </div>
        </Router>
      </Provider>
     
    </div>
     <nav className="centerAlign" id="footer">
     <p>
       <a
         href="https://github.com/bh007183/book-mania"
         target="_blank"
         style={{color: "white"}}
       >
         Book-Mania Code Base
       </a>
     </p>
   </nav>
   </>
  );
}

export default App;
