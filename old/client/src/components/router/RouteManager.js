import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "../main/MainPage";
import RouteMainManager from "./RouteMainManager";
import RouteGameManager from "./RouteGameManager";

export default function RouteManager() {
  return (
    <Router>
      <Switch>
        <Route path='/game'>
          <RouteGameManager />
        </Route>
        <Route path='/'>
          <RouteMainManager />
        </Route>
      </Switch>
    </Router>
  )
}