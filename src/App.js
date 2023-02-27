import { useState, useEffect } from 'react';
import './App.css';
import Home from './Component/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Navbar from './Component/Navabar'
import Alert from './Component/Alert';
import { useNavigate } from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showDiv,setShowDiv] = useState(true);
  const [search, setSearch] = useState("");
  const [page,setPage] = useState(1);

  const showAlret = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar 
            checked={checked} 
            setChecked={setChecked}
            showDiv={showDiv}
            setShowDiv={setShowDiv}
            search={search}
            setSearch={setSearch}
            page={page}
            />
          <Alert alert={alert} />
          <div>
            <Switch>
              <Route exact path="/">
                <Home 
                 checked={checked} 
                 showDiv={showDiv}
                 searchNav={search}
                 page={page}
                 setPage={setPage}
                 />
              </Route>
              <Route exact path="/login">
                <Login showAlret={showAlret} />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
          
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;