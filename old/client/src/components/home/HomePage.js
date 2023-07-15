import React from 'react'
import {Grid, makeStyles} from "@material-ui/core";

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

export default function HomePage() {
  const classes = useStyle()

  return (
    <div>
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <h1>Home</h1>
        </Grid>
      </Grid>
    </div>
  )
}
