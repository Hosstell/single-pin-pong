import React from 'react'
import {Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";

const useStyle = makeStyles({
  card: {
    backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 1) 50%, rgba(0, 0, 0, 0.0)), url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Noun_Project_tools_icon_943586_cc.svg/1024px-Noun_Project_tools_icon_943586_cc.svg.png)`,
    backgroundSize: 'contain',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    color: 'white !important'
  }
})

export default function GameInDevelopmentCard() {
  const classes = useStyle()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          A game is being developed
        </Typography>
        <Typography variant="body2" component="p" color='white'>
          <div style={{width: '50%'}}>
            This game is currently being developed. You will be able to play it soon
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled
        >
          Play
        </Button>
      </CardActions>
    </Card>
  )
}