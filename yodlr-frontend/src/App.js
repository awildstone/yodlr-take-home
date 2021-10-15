import { useState, useEffect } from 'react';
import { BrowserRouter, withRouter } from "react-router-dom";
import UsersContext from './context/UsersContext';
import Routes from "./routes/Routes";
import axios from "axios";
import NavBar from "./navigation/NavBar";
import "./App.scss";

const BASE_URL = "http://localhost:3000";

function App() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const NavWithRouter = withRouter(NavBar);

  //effect to get the initial user data from state if users is null
  useEffect(() => {
    if (!users) {
      setIsLoading(true);
      getUsers();
    } 
  },[users]);

  //makes a call to db to get users
  const getUsers = async () => {
    let response;
    try {
      response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.warn(err);
    }
  }

  //handles requests to add new users and updates current users in app state
  const handleAddUser = async (userData) => {
    try {
      await axios.post(`${BASE_URL}/users`, userData);
      getUsers();
    } catch (err) {
      console.warn(err);
    }
  };

  //handles request to update user's state and updates current users in app state
  const handleUpdateUser = async (userData) => {
    //update the user's state data to active
    userData.state = "active";
    try {
      await axios.put(`${BASE_URL}/users/${userData.id}`, userData);
      getUsers();
    } catch (err) {
      console.warn(err);
    }
  };

  //handles request to delete a user, and updates current users in app state
  const handleDeleteUser = async (userData) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userData.id}`, userData);
      getUsers();
    } catch (err) {
      console.warn(err);
    }

  };

  if (!isLoading) {
    return (
      <BrowserRouter>
        <UsersContext.Provider value={{ users, handleAddUser, handleUpdateUser, handleDeleteUser}}>
          <NavWithRouter />
            <Routes />
        </UsersContext.Provider>
      </BrowserRouter>
    );
  } else {
    return (
      <h1>Loading...</h1>
    );
  }
  
}

export default App;
