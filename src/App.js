import React,{useState,useCallback} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Auth from './user/pages/Auth';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import AuthContext from './shared/Context/AuthContext';


const App = () => {
  const [isLoggedIn,setLoggedIn]=useState(false);
  const [userId,setUserId]=useState(null);
  const login=useCallback((uid)=>{
    setLoggedIn(true);
    setUserId(uid);
  },[])
  const logout=useCallback(()=>{
    setLoggedIn(false);
    setUserId(null);
  },[])
  let routes;
  if(isLoggedIn){
  routes=(<Switch>
     <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/place/:placeId" exact>
            <UpdatePlace/>
          </Route>
          <Redirect to="/" />
  </Switch>)
  }
  else{
    routes=(
      <Switch>
      <Route path="/" exact>
      <Users />
    </Route>
    <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/auth" exact>
              <Auth/>
          </Route>
          <Redirect to="/auth"/>
    </Switch>
    )
  }
  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,userId:userId,login:login,logout:logout}}>

    <Router>
      <MainNavigation />
      <main>
       {routes}
      </main>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
