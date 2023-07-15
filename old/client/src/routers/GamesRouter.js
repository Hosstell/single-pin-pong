import React from 'react'
import RocketDuel from "../games/rocket_duel/RocketDuel";
import {Route} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NestedRoute from "../components/common/NestedRoute";

export default function GamesRouter() {
  const games = [{
    routeProps: {path: '/rocket-duel'},
    component: <RocketDuel />
  }]


  return (
    <div>

      { games.map((game, i) => {
        return (
          <NestedRoute {...game.routeProps} key={i}>
            {game.component}
          </NestedRoute>
        )
      })}

    </div>
  )
}
