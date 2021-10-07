import React, {useEffect, useState} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import {AuthContext} from "./context";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('credentials')) {
      setIsAuth(true)
    }
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <HashRouter>
        <React.Suspense fallback={loading}>
          {isAuth
            ?
            <Switch>
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>}/>
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>}/>
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>}/>
              <Redirect to="/home"/>
            </Switch>
            :
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>}/>
              <Redirect to="/login"/>
            </Switch>
          }
        </React.Suspense>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
