import logo from './logo.svg';
import './App.css';
import Dashboard from "./pages/Dashboard"
import Login from "./pages/login"
import Create from "./pages/create"
import {Provider} from "react-redux"
import configureStore from "./state/configureStore"
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
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/create-account" element={<Create/>}/>
        </Routes>
      </Router>
    
    </Provider>
  );
}

export default App;
