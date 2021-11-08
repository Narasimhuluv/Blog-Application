import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import { ArticleApi, localStoragekey, userVerify } from "../utls/ApiLinks";
import NewArticle from "./NewArticle";
import Profile from "./Profile";
import Settings from "./Settings";
import UpdateArticle from "./UpdateArticle";
import OtherProfile from "./OtherProfile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UpdateArticle: null,
      isLogged: false,
      user: null,
      isVerifying: true,
      UpdateComment: null,
      UpdateProfile: null,
      favortedArticles: [],
    };
  }

  onUpdateUser = (userData) => {
    this.setState({
      isLogged: true,
      user: userData,
      isVerifying: false,
    });
    localStorage.getItem(localStoragekey, userData.token);
  };
  onUpdateArticle = (updated) => {
    this.setState({
      UpdateArticle: updated,
    });
  };

  onUpdatedComment = (comment) => {
    this.setState({
      UpdateComment: comment,
    });
  };

  onUpdateProfile = (profile) => {
    this.setState({
      UpdateProfile: profile,
    });
  };

  logOut = () => {
    localStorage.clear();
  };

  componentDidMount() {
    var storagekey = localStorage[localStoragekey];
    if (storagekey) {
      fetch(userVerify, {
        method: "GET",
        headers: {
          authorization: `Token ${storagekey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then((user) => {
          this.onUpdateUser(user);
          // console.log(user.user.username, "hello user")
          this.FavoritedArticleData(user.user.username);
        })
        .catch((errors) => console.log(errors));
    } else {
      this.setState({
        isVerifying: false,
      });
    }
  }

  FavoritedArticleData = (username) => {
    var storagekey = localStorage[localStoragekey];
    if (storagekey) {
      fetch(ArticleApi + `/?favorited=${username}`, {
        method: "GET",
        headers: {
          authorization: `Token ${storagekey}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((favoriteArticleData) => {
          this.setState({
            isLoading: false,
            favortedArticles: favoriteArticleData.articles,
          });
        });
    }
  };

  render() {
    if (this.state.isVerifying) {
      return (
        <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
      );
    }
    return (
      <div>
        <Header {...this.state} logout={this.logOut} />
        {this.state.isLogged ? (
          <Athenticated
            {...this.state}
            onUpdateUser={this.onUpdateUser}
            onUpdateArticle={this.onUpdateArticle}
            onUpdatedComment={this.onUpdatedComment}
            onUpdateProfile={this.onUpdateProfile}
          />
        ) : (
          <UnAthenticated {...this.state} onUpdateUser={this.onUpdateUser} />
        )}
      </div>
    );
  }
}
function UnAthenticated(props) {
  return (
    <Switch>
      <Route exact path="/users" component={Register} />

      <Route exact path="/users/login">
        <Login {...props} onUpdateUser={props.onUpdateUser} />
      </Route>

      <Route exact path="/">
        <Home {...props} />
      </Route>

      <Route exact path="/articles/:slug" component={IndividualArticle} />
      <Route exact path="/profiles/:username">
        <OtherProfile {...props} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

function Athenticated(props) {
  var user = props.user;
  // console.log(props)
  return (
    <Switch>
      {/* <Route exact path="/users" component={Register} /> */}

      {/* <Route exact path="/users/login" component={Login} /> */}

      {/* <Route exact path="/users/login">
                <Login {...this.state} onUpdateUser={this.onUpdateUser}/>
            </Route> */}

      <Route exact path="/">
        <Home {...props} user={user} />
      </Route>

      <Route exact path="/articles/:slug">
        <IndividualArticle {...props} user={user} />
        {/* <Comments {...props}/> */}
      </Route>

      <Route exact path="/articles">
        <NewArticle />
      </Route>

      <Route exact path="/profiles">
        <Profile user={user} {...props} />
      </Route>
      <Route exact path="/user">
        <Settings {...props} />
      </Route>

      <Route exact path="/articles/:slug/update">
        <UpdateArticle {...props} />
      </Route>
      <Route exact path="/profiles/:username">
        <OtherProfile {...props} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
