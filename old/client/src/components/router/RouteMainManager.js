import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigator from "../main/Navigation";
import GamesList from "../games/GamesList";
import {makeStyles} from "@material-ui/core";
import HomePage from "../home/HomePage";
import AboutUs from "../about/AboutUs";

export default function RouteMainManager() {
  return (
    <div>
      <Navigator />

      <div>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/games">
          <GamesList />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
      </div>
    </div>
  )
}