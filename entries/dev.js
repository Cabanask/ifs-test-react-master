
 import React from 'react'
 import { render } from 'react-dom'
 import { Router, Route, browserHistory } from 'react-router'
 
 import App from 'containers/App';
 import Home from 'containers/Home'
 
 import routes from 'config/routes'
 
 const rootEl = document.getElementById('app')
 
 render(
     <Router history={ browserHistory }>
         <Route component={ App }>
             <Route path={ routes.home } component={ Home } />
         </Route>
     </Router>,
     rootEl
 )