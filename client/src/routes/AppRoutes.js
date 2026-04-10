import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LandingPage, StudentLogin, AdminLogin, StudentDashboard, AdminDashboard } from '../pages';
import { ProtectedRoute } from '../components';
import { useUserContext } from '../store/UserStore';

const AppRoutes = () => {
  const { user } = useUserContext();

  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/">
        {user ? (
          <Redirect to={user.role === 1 ? '/admin-dashboard' : '/student-dashboard'} />
        ) : (
          <LandingPage />
        )}
      </Route>

      <Route path="/student-login">
        {user ? (
          <Redirect to={user.role === 1 ? '/admin-dashboard' : '/student-dashboard'} />
        ) : (
          <StudentLogin />
        )}
      </Route>

      <Route path="/admin-login">
        {user ? (
          <Redirect to={user.role === 1 ? '/admin-dashboard' : '/student-dashboard'} />
        ) : (
          <AdminLogin />
        )}
      </Route>

      {/* Protected Routes — All roles granted access for demo */}
      <ProtectedRoute
        path="/student-dashboard"
        component={StudentDashboard}
        allowedRoles={[1, 2, 3, 4]}
      />

      <ProtectedRoute
        path="/admin-dashboard"
        component={AdminDashboard}
        allowedRoles={[1, 2, 3, 4]}
      />

      {/* Fallback */}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
