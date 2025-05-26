import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppLayout } from "./layouts/app-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { Dashboard } from "./pages/dashboard";
import { Prediction } from "./pages/prediction";
import { Model } from "./pages/model";
import { Learn } from "./pages/learn";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Home } from "./pages/home";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/auth-context";
import { CryptoDetail } from "./pages/crypto-detail";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="crypto-predict-theme">
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth">
            <AuthLayout>
              <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />
                <Redirect to="/auth/login" />
              </Switch>
            </AuthLayout>
          </Route>
          <Route path="/app">
            <AppLayout>
              <Switch>
                <Route exact path="/app/dashboard" component={Dashboard} />
                <Route path="/app/dashboard/:cryptoId" component={CryptoDetail} />
                <Route path="/app/prediction" component={Prediction} />
                <Route path="/app/model" component={Model} />
                <Route path="/app/learn" component={Learn} />
                <Redirect to="/app/dashboard" />
              </Switch>
            </AppLayout>
          </Route>
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;