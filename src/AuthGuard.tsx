import React from 'react';
import { Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

/*const PrivateRoute: React.FC<any> = ({component: Component, ...rest}) => {
    const authUser = useSelector( (state:any) => state.auth.data);
    return (
      <Route
        {...rest}
        render={(props) => (authUser.authenticated === true && authUser.isVerified === true && authUser.user)
          ? <Component {...props} />
          : <Navigate replace to='/login' />}
      />
    )
}*/
const PrivateRoute: React.FC<any> = ({ children }) => {
  const authUser = useSelector( (state:any) => state.auth.data);
  if (!(authUser.authenticated === true && authUser.isVerified === true && authUser.user)) {
    // not logged in so redirect to login page with the return url
    return <Navigate replace to='/login' />
  }

  // authorized so return child components
  return children;
  
}
export default PrivateRoute;