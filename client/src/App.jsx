import React  from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';
import { Container} from '@material-ui/core';



import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import PostDetails from './components/PostDetails/PostDetails';
import Auth from './components/Auth/Auth';
import MyCarousel from './Carsoul.js'
import PrimarySearchAppBar from './altnav.js'

import Homepage from './Homepage.js'
function App() {
 const user=JSON.parse(localStorage.getItem("profile"));
return (
    <Router>
      <Switch>
        {/* Auth Page (separate, no homepage shown) */}
        <Route
          path="/auth"
          exact
          render={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />
        <Route path="/posts/:id" component={PostDetails} />

        {/* All other pages include Homepage layout */}
        <Route>
          <Container maxWidth={false} disableGutters>
            <Homepage />
            <Switch>
              <Route path="/" exact component={() => <Redirect to="/posts" />} />
              <Route path="/posts" exact component={Home} />
              <Route path="/posts/search" exact component={Home} />
              
            </Switch>
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;