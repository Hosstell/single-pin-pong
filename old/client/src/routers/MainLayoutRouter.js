import React from 'react'
import MainLayout from "../layouts/MainLayout";
import GamesList from "../components/games/GamesList";
import {Route} from "react-router-dom";
import AboutUs from "../components/about/AboutUs";
import HomePage from "../components/home/HomePage";

export default function MainLayoutRouter() {
  const routes = [{
    routeProps: {path: '/game-list'},
    component: <GamesList />
  }, {
    routeProps: {path: '/about'},
    component: <AboutUs />
  }, {
    routeProps: {path: '/home'},
    component: <HomePage />
  }]

  return (
    <div>

      { routes.map(route => {
        return (
          <Route {...route.routeProps}>
            <MainLayout>
              {route.component}
            </MainLayout>
          </Route>
        )
      })}

    </div>
  )
}
