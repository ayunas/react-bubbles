import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// export function PrivateRoute(props) {
//     console.log(props);
//     if (localStorage.getItem('token')) {
//         return <Route exact path='/' component={props.component} />
//     } else {
//         return <Redirect to="/login"/>
//     }
// }

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (localStorage.getItem("token")) {
            return <Component {...props} />;
          }
          return <Redirect to="/login" />;
        }}
      />
    );
  };

