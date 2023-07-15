import React, {useEffect} from 'react'
import {createGame} from "./newGame";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles(() => {
  console.log(window)
  return {
    canvas: {
      width: `${window.innerWidth - 10}px`,
      height: `${window.innerHeight - 10}px`,
      padding: '5px',
    },
    rootDiv: {
      position: 'fixed'
    }
  }
})


export default function RocketDuel() {
  const classes = useStyle()

  useEffect(() => {
    createGame(document.getElementById('rocker_duel_game_id'))

    window.addEventListener('resize', () => {
      console.log('resize')
      // TODO: add resize function
    })
  }, [])

  return (
    <div className={classes.rootDiv}>
      <canvas id="rocker_duel_game_id" className={classes.canvas}/>
    </div>
  )
}
