import React from 'react';
import { withRouter } from 'react-router';
import {api, ArticleApi} from '../utls/ApiLinks';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

class OtherProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            otherprofile : [],
            ProfileArticles : [],
            isLoading : true,
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
             console.log(this.state.ProfileArticles)
        })
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
                            <h3 className="font-extrabold text-blue-500 cursor-pointer">Follow {otherprofile.following}</h3>
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
    return(
        <>
            <article className="mb-14">
                <span className="text-gray-600">{moment(each.createdAt).format('L')}</span>
                <h2 className="text-2xl text-gray-700 font-extrabold">{each.title}</h2>
                {/* <img src={ } alt="" /> */}
                <img src={`/images/articles_images/${each.slug}.png`} alt="" />
                {/* <img className="rounded-md mt-4" src={`/images/bg.png`} alt="" /> */}
                <p className="mt-4 text-md font-bold text-gray-600">{(each.description).slice(0,68)} . . . . </p>
                {/* <p className="mt-2 text-sm font-bold text-gray-500">{(each.body).slice(0,68)} . . . . </p> */}
                <NavLink to={`/articles/${each.slug}`}>
                    <p className="mt-4 text-blue-500 font-bold">Read More . . .</p>
                </NavLink>
                <hr className="mt-4"/>

            </article>

        </>
    )
}
export default withRouter(OtherProfile)