import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Container } from "@material-ui/core";

import Homepage from "./Homepage";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import PrimarySearchAppBar from "./altnav";
import Footer from "./Footer";

function AppContent() {
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();

  // hide navbar on these routes
  const hideNavbar =
    location.pathname === "/auth" ||
    location.pathname === "/create-post" ||
    location.pathname === "/update-post";

  return (
    <>
      {!hideNavbar && <PrimarySearchAppBar currentId={currentId} setCurrentId={setCurrentId} />}

      <Switch>
        {/* Auth Page */}
        <Route
          path="/auth"
          exact
          render={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />

        {/* Create & Update Post Pages */}
        <Route
          path="/create-post"
          exact
          render={() => <Form currentId={currentId} setCurrentId={setCurrentId} />}
        />
        <Route
          path="/update-post"
          exact
          render={() => <Form currentId={currentId} setCurrentId={setCurrentId} />}
        />

        {/* Post Details */}
        <Route path="/posts/:id" component={PostDetails} />

        {/* Homepage layout */}
        <Route>
          <Container maxWidth={false} disableGutters>
            <Homepage setCurrentId={setCurrentId} currentId={currentId} />
            <Switch>
              <Route path="/" exact component={() => <Redirect to="/posts" />} />
              <Route
                path="/posts"
                exact
                render={() => <Home setCurrentId={setCurrentId} />}
              />
              <Route
                path="/search"
                exact
                render={() => <Home setCurrentId={setCurrentId} />}
              />
            </Switch>
          </Container>
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}