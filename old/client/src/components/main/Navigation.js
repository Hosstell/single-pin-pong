import React from 'react'
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory} from 'react-router-dom'

const useStyle = makeStyles({
  list: {
    marginLeft: 10,
    marginRight: 10
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
  }
})


export default function Navigator({propClasses}) {
  const classes = useStyle()
  const history = useHistory()

  const items = [{
    icon: <HomeIcon />,
    name: 'Home',
    url: '/home'
  }, {
    icon: <SportsEsportsIcon />,
    name: 'Games',
    url: '/games'
  }, {
    icon: <InfoIcon />,
    name: 'About us',
    url: 'about'
  }]

  return (
    <div>
      <Drawer anchor="left" open variant="persistent" classes={{paper: propClasses.drawer}}>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <ListItemIcon> <ScreenRotationIcon /> </ListItemIcon>
            <ListItemText primary="MY PROJECT"/>
          </ListItem>

          <Divider />

          { items.map((item, i) => {
            return (
              <ListItem
                onClick={() => history.push(item.url)}
                button
                key={i}
                className={classes.listItem}
              >
                <ListItemIcon> {item.icon} </ListItemIcon>
                <ListItemText primary={item.name}/>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </div>
  )
}
