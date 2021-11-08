import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { api, ArticleApi, localStoragekey } from "../utls/ApiLinks";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

class OtherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherprofile: [],
      ProfileArticles: [],
      isLoading: true,
      followorunfollow: "Follow",
    };
  }

  componentDidMount() {
    this.FetchOtherProfile();
    this.FetchOtherProfileArticle();
  }

  FetchOtherProfile = () => {
    var profile = this.props.match.params.username;
    fetch(api + `/profiles/${profile}`)
      .then((res) => res.json())
      .then((profileData) => {
        console.log(profileData.profile, "hello thing ");
        this.setState({
          isLoading: false,
          otherprofile: profileData.profile,
        });
      });
  };

  FetchOtherProfileArticle = () => {
    var profile = this.props.match.params.username;
    fetch(ArticleApi + `/?author=${profile}`)
      .then((res) => res.json())
      .then((profileArticleData) => {
        console.log(profileArticleData);
        this.setState({
          ProfileArticles: profileArticleData.articles,
        });
      });
  };

  FollowUser = (username) => {
    let storageKey = localStorage[localStoragekey];
    fetch(api + `profiles/${username}/follow`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${storageKey}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          console.log(res.json());
          // this.props.history.push(`/`);
        }
      })
      .then((data) => {
        this.setState({
          followorunfollow: "follow",
        });
      })
      .catch((errors) => {
        console.log(errors);
        this.setState({ errors });
      });
  };

  UnFollowUser = () => {
    var profile = this.props.match.params.username;
    var storagekey = localStorage[localStoragekey];
    if (storagekey) {
      fetch(api + `profiles/${profile}/follow`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${storagekey}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          } else {
            console.log(res.json());
            //   this.props.history.push(`/profile/${profile}`);
          }
        })
        .then((data) => {})
        .catch((errors) => {
          console.log(errors);
          this.setState({ errors });
        });
    }
  };
  handleFollow = (username) => {
    this.FollowUser(username);
    console.log("Follow");
  };

  handleUnFollow = (username) => {
    this.UnFollowUser(username);
    console.log("Un Follow");
  };

  render() {
    var isLoading = this.state.isLoading;
    console.log(this.props);
    var otherprofile = this.state.otherprofile;
    var profileArticles = this.state.ProfileArticles;
    if (isLoading) {
      return (
        <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
      );
    }
    return (
      <>
        <div className="container">
          <section className="flex  m-7">
            <div>
              <div className="typing-demo">
                <h2 className="text-3xl font-extrabold uppercase">
                  {otherprofile.username}
                </h2>
              </div>
              <p className="text-sm">{otherprofile.bio}</p>
            </div>
            <div className="ml-8 flex">
              {/* <p onClick={() =>this.handleFollow(otherprofile.username)}>Follow</p> */}

              {/* // otherprofile.following === false   ? <p onClick={() =>this.handleFollow(otherprofile.username)} className="cursor-pointer text-green-400">Follow</p> : <p onClick={() =>this.handleUnFollow(otherprofile.username)} className="cursor-pointer text-green-400">UnFollow</p> */}
              <p
                onClick={() => this.handleFollow(otherprofile.username)}
                className="cursor-pointer text-green-400"
              >
                Follow
              </p>
              <p
                onClick={() => this.handleUnFollow(otherprofile.username)}
                className="cursor-pointer ml-4 text-red-400"
              >
                UnFollow
              </p>
            </div>
          </section>

          <section className=" flex">
            <div className="m-7 w-2/12 text-center ">
              <img
                className="rounded-lg w-full"
                src={otherprofile.image}
                alt=""
              />
              <h4 className="font-extrabold my-1">{otherprofile.username}</h4>
              <p className="text-sm">{otherprofile.bio}</p>
            </div>

            <div className="w-9/12 m-7">
              {profileArticles.map((each) => (
                <EachArticle each={each} />
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }
}
function EachArticle(props) {
  var { each } = props;
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <article
        className="mb-14"
        data-aos="fade-up"
        data-aos-anchor-placement="center-center"
      >
        <span className="text-gray-600">
          {moment(each.createdAt).format("L")}
        </span>
        <h2 className="text-2xl text-gray-700 font-extrabold">{each.title}</h2>
        {/* <img src={ } alt="" /> */}
        <img src={`/images/articles_images/${each.slug}.png`} alt="" />
        {/* <img className="rounded-md mt-4" src={`/images/bg.png`} alt="" /> */}
        <p className="mt-4 text-md font-bold text-gray-600">
          {each.description.slice(0, 68)} . . . .{" "}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-500">
          {each.body.slice(0, 98)} . . . .{" "}
        </p>
        <NavLink to={`/articles/${each.slug}`}>
          <p className="mt-4 text-blue-500 font-bold">Read More . . .</p>
        </NavLink>
        <hr className="mt-4" />
      </article>
    </>
  );
}
export default withRouter(OtherProfile);
