import React from 'react';
import { withRouter } from 'react-router';
import {api, ArticleApi, localStoragekey} from '../utls/ApiLinks';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

class OtherProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            otherprofile : [],
            ProfileArticles : [],
            isLoading : true,
            followorunfollow : "Follow",
        }
    }

    componentDidMount(){
        this.FetchOtherProfile();
        this.FetchOtherProfileArticle();
    }

    FetchOtherProfile = () => {
        var profile = this.props.match.params.username;
        fetch(api + `/profiles/${profile}`)
        .then((res) => res.json())
        .then((profileData) => {
            this.setState({
                isLoading : false,
                otherprofile : profileData.profile
            })
        })
    }

    FetchOtherProfileArticle = () => {
        var profile = this.props.match.params.username;
        fetch(ArticleApi + `/?author=${profile}`)
        .then((res) => res.json())
        .then((profileArticleData) => {
             this.setState({
                ProfileArticles : profileArticleData.articles
             })
        })
    }

    FollowUser = () => {
        var profile = this.props.match.params.username
        var storagekey = localStorage[localStoragekey];
        if(storagekey){
            fetch(api + `profiles/${profile}/follow`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json',
                authorization : `Token ${storagekey}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
            })
            .then((res) => res.json())
            .then((updateUser) => {
                this.props.onUpdateUser(updateUser.profile)
                this.props.onUpdateProfile(updateUser.profile);
                this.props.history.push(`/profiles/${profile}`);
                this.setState({
                    otherprofile : updateUser.profile
                })
            })
        }
    }

    UnFollowUser = () => {
        var profile = this.props.match.params.username
        var storagekey = localStorage[localStoragekey];
        if(storagekey){
            fetch(api + `profiles/${profile}/follow`, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json',
                authorization : `Token ${storagekey}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
            .then((res) => res.json())
            .then((updateUser) => {
                console.log(updateUser)
                this.props.onUpdateProfile(updateUser);
                this.props.history.push(`/profiles/${profile}`)
                this.setState({
                    otherprofile : updateUser.profile
                })
            })
        }
    }
    handleFollow = () => {
        this.FollowUser();
        console.log("Follow")
        // this.setState({
        //     followorunfollow : "Un Follow"
        // })
    }

    handleUnFollow = () => {
        this.UnFollowUser();
    }

    render(){
        var isLoading = this.state.isLoading;
        var profileArticles = this.state.ProfileArticles
        if(isLoading){
            return (
                <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
            )
        }
        var {otherprofile} = this.state
        console.log(otherprofile)
        return(
            <>
                <div className="container">
                    <section className="flex  m-7">
                        <div>
                            <div className="typing-demo">
                                <h2 className="text-3xl font-extrabold uppercase">{otherprofile.username}</h2>
                            </div>
                            <p className="text-sm">{otherprofile.bio}</p>
                        </div>
                        <div className="ml-8">
                             {/* <h3 className="font-extrabold text-blue-500 cursor-pointer" onClick={this.handleFollow}>{this.state.followorunfollow}</h3> */}
                             {
                                 otherprofile.following === false ? <p className="font-extrabold text-blue-500 cursor-pointer" onClick={this.handleFollow}>Follow</p>: <p className="font-extrabold text-blue-500 cursor-pointer" onClick={this.handleUnFollow}>Un Follow</p>
                             }
                            
                            {/* {
                                otherprofile.following === true ? <h3 className="font-extrabold text-blue-500 cursor-pointer" onClick={this.handleFollow}>Un Follow</h3> : <h3 className="font-extrabold text-blue-500 cursor-pointer" onClick={this.handleFollow}>Follow</h3>
                            } */}
                        </div>
                    </section>

                    <section className=" flex">
                        <div className="m-7 w-2/12 text-center ">
                            <img className="rounded-lg w-full" src={otherprofile.image} alt="" />
                            <h4 className="font-extrabold my-1">{otherprofile.username}</h4>
                            <p className="text-sm">{otherprofile.bio}</p>    
                        </div>

                        <div className="w-9/12 m-7">
                            {
                                profileArticles.map((each) => (
                                    <EachArticle each={each}/>
                                ))
                            }
                        </div>
                        
                    </section>
                </div>
            </>
        )
    }
}
function EachArticle(props){
    var {each} = props;
    console.log(each, "each articles")
    return(
        <>
            <article className="mb-14">
                <span className="text-gray-600">{moment(each.createdAt).format('L')}</span>
                <h2 className="text-2xl text-gray-700 font-extrabold">{each.title}</h2>
                {/* <img src={ } alt="" /> */}
                <img src={`/images/articles_images/${each.slug}.png`} alt="" />
                {/* <img className="rounded-md mt-4" src={`/images/bg.png`} alt="" /> */}
                <p className="mt-4 text-md font-bold text-gray-600">{(each.description).slice(0,68)} . . . . </p>
                <p className="mt-2 text-sm font-bold text-gray-500">{(each.body).slice(0,100)} . . . . </p>
                <NavLink to={`/articles/${each.slug}`}>
                    <p className="mt-4 text-blue-500 font-bold">Read More . . .</p>
                </NavLink>
                <hr className="mt-4"/>

            </article>

        </>
    )
}
export default withRouter(OtherProfile)