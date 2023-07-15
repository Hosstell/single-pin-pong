import React from 'react'
import Navigation from './../components/main/Navigation'
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles(() => {
  const drawerWidth = 300

  return {
    drawer: {
      width: `${drawerWidth}px`,
    },
    mainField: {
      paddingLeft: `${drawerWidth}px`,
    },
    marginPadding: {
      paddingLeft: '30px'
    }
  }
})

export default function MainLayout({children}) {
  const classes = useStyle()

  return (
    <div>
      <div>
        <Navigation propClasses={{drawer: classes.drawer}}/>
      </div>
      <div className={classes.mainField}>
        <div className={classes.marginPadding}>
          {children}
        </div>
      </div>
    </div>
  )
}



