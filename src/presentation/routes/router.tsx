import React from "react";
import {
  HashRouter as Router, Route, Switch
} from "react-router-dom";
import HomePage from "../components/pages/home";
import SettingsPage from "../components/pages/settings";
import AppRoute from "./route";

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={AppRoute.Settings} component={SettingsPage} />
        <Route path={AppRoute.Home} component={HomePage} />
      </Switch>
    </Router>
  );
}
