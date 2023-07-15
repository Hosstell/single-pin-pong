import React from 'react'
import {Container, Grid, makeStyles} from "@material-ui/core";
import GameCard from "./GameCard";
import GameInDevelopmentCard from "./GameInDevelopmentCard";

const useStyle = makeStyles({
  mainGrid: {
    marginTop: '0px',
    paddingLeft: '60px',
    paddingRight: '60px'
  },
  gameCard: {
    paddingRight: '20px',
    paddingBottom: '20px'
  }
})

export default function GamesList() {
  const classes = useStyle()

  let games = [{
    title: 'Table tennis duel',
    description: 'This is a game for two. You need to hold the ball with the racket longer than your opponent',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Tabletennis.jpg/300px-Tabletennis.jpg',
    url: '/games/rocket-duel'
  }]

  const playGame = (gameUrl) => {
    window.open(gameUrl)
  }

  return (
    <div>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <h1>Games</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container>

            {games.map((game, i) => {
              return (
                <Grid
                  item
                  xl={4} lg={6} md={12} sm={12}
                  className={classes.gameCard}
                >
                  <GameCard
                    title={game.title}
                    description={game.description}
                    img={game.img}
                    onClick={() => playGame(game.url)}
                    key={i}
                  />
                </Grid>
              )
            })}

            <Grid
              item
              xl={4} lg={6} md={12} sm={12}
              className={classes.gameCard}
            >
              <GameInDevelopmentCard />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
