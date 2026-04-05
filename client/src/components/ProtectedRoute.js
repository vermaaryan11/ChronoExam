import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../store/UserStore';

/**
 * ProtectedRoute — Role-based navigation guard.
 * @param {number[]} allowedRoles - Array of role IDs allowed to access this route
 * @param {React.Component} component - Component to render
 */
const ProtectedRoute = ({ component: Component, allowedRoles = [], ...rest }) => {
  const { user } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to="/" />;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          const redirectPath = user.role === 1 ? '/admin-dashboard' : '/student-dashboard';
          return <Redirect to={redirectPath} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
