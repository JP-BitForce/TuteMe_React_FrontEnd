import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Route,Switch} from 'react-router-dom'
import routes from './route/routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {
            routes.data.map((route,i)=>{
              return route.type === "main" ?
              (
                <Route exact path = {route.path} component={route.component} key = {i}/>
              ):
              (
                <Route path = {route.path} component={route.component} key = {i}/>
              )
            })
          }
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
