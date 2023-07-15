import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainLayoutRouter from "./MainLayoutRouter";
import GamesRouter from "./GamesRouter";

export default function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/games">
          <GamesRouter />
        </Route>

        <Route path="/">
          <MainLayoutRouter />
        </Route>
      </Switch>
    </Router>
  )
}
