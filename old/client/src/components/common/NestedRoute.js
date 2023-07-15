import React from 'react'
import { useRouteMatch, Route } from 'react-router-dom';
import urljoin from 'url-join'


export default function NestedRoute({path, ...otherProps}) {
  const match = useRouteMatch()
  const newPath = urljoin(match.url, path)
  console.log(newPath, otherProps)
  return <Route path={newPath} {...otherProps} />
}
