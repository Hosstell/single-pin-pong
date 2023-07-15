import React from 'react'
import {Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";


const useStyle = makeStyles({
  card: props => ({
    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 50%, rgba(0, 0, 0, 0.0)), url(${props.img})`,
    backgroundSize: 'contain',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat'
  })
})

export default function GameCard({ title, description, img, onClick }) {
  const classes = useStyle({img})

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          { title }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <div style={{width: '50%'}}>
            { description }
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Play
        </Button>
      </CardActions>
    </Card>
  )
}