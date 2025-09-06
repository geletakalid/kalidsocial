import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";

import Homepage from "./Homepage";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Switch>
        {/* Auth Page (standalone, no Homepage layout) */}
        <Route
          path="/auth"
          exact
          render={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />

        {/* Create Post Page (standalone form) */}
        <Route
          path="/create-post"
          exact
          render={() => <Form currentId={currentId} setCurrentId={setCurrentId} />}
        />

        {/* Post Details */}
        <Route path="/posts/:id" component={PostDetails} />

        {/* Default pages with Homepage layout */}
        <Route>
          <Container maxWidth={false} disableGutters>
            <Homepage />
            <Switch>
              <Route path="/" exact component={() => <Redirect to="/posts" />} />
              <Route path="/posts" exact render={() => <Home setCurrentId={setCurrentId} />} />
              <Route path="/posts/search" exact render={() => <Home setCurrentId={setCurrentId} />} />
            </Switch>
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;