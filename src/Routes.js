import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./views/Register";
import "./App.scss";

import PrivateRoute from "./Routes/PrivateRoute";
import { Home } from "./components/Home";
import Footer from "./components/Footer";
import Onboard from "./components/Onboard";
import Login from "./views/Login";
import News from "./views/News";
import { Post } from "./views/Post";
import { ExploreInterests } from "./views/ExploreInterests";
import { EditProfile } from "./views/EditProfile";
import { ViewProfile } from "./views/ViewProfile";
import { ViewUserProfile } from "./views/ViewUserProfile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Onboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/news" component={News} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/post/:postId" component={Post} />
        <PrivateRoute exact path="/explore" component={ExploreInterests} />
        <PrivateRoute exact path="/profile/edit" component={EditProfile} />
        <PrivateRoute exact path="/profile" component={ViewProfile} />
        <PrivateRoute exact path="/user/:id" component={ViewUserProfile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
