import React from 'react';
import { withRouter } from 'react-router';
import {ArticleApi} from '../utls/ApiLinks';
import { NavLink } from 'react-router-dom';
import {localStoragekey} from  '../utls/ApiLinks'
import Comments from './Comments';


class IndividualArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            EachArticle : [],
            AllArticles : [],
            isLoading : true,
            favorite : "",
            allcomments : [],
        }
    }
    componentDidMount(){
        this.FetchEachArticle();
        this.fetchGetComments();
    }
    componentDidUpdate(_prevProps, prevState){
        if(this.state.allcomments !== prevState.allcomments){
            this.FetchEachArticle();
            this.AddFavorite();
        }
    }
    // componentDidUpdate(){
    //     this.FetchEachArticle();
    // }
    FetchEachArticle = () => {
        var {slug} = this.props.match.params;
        fetch(ArticleApi + `/${slug}`).then((res) => {
           return res.json()
        }).then((articleData) => {
            this.setState({
                EachArticle : articleData.article,
                isLoading  : false,
            })
        }).catch(err => console.log(err));
    }


    AddFavorite = (slug) => {
        var storagekey = localStorage[localStoragekey];
        fetch(ArticleApi + `/${slug}/favorite`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Token ${storagekey}`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          })
            .then((res) => {
              if (!res.ok) {
                return res.json().then(({ errors }) => {
                  return Promise.reject(errors);
                });
              } else {
                console.log(res.json());
                res.json();
                this.props.history.push(`/articles/${slug}`)
              }
            })
            .catch((errors) => {
              console.log(errors);
            });
    }

    removeFavorite = (slug) => {
        var storagekey = localStorage[localStoragekey];
        if(storagekey){
            fetch(ArticleApi + `/${slug}/favorite`, {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Token ${storagekey}`,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
              })
                .then((res) => {
                  if (!res.ok) {
                    return res.json().then(({ errors }) => {
                      return Promise.reject(errors);
                    });
                  } 
                  console.log(res.json());
                  this.FetchEachArticle();
                })
                .catch((errors) => {
                  console.log(errors);
                  this.setState({ errors });
                });
        }
    }

    fetchGetComments = () => {
        var {slug} = this.props.match.params
        fetch(ArticleApi + `/${slug}/comments`)
        .then((res) => res.json())
        .then((all) => {
            this.setState({
                allcomments : all.comments
            })
        })
    }

    handleFavorite = (slug) => {
        this.AddFavorite(slug);
        this.setState({
            favorite : "favorite",
        })
    }

    handleUnvorite = (slug) => {
        this.removeFavorite(slug);
        this.setState({
            favorite : "unfavorite"
        })
    }

    render(){
        var isLoading = this.state.isLoading;
        if(isLoading){
            return (
                <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
            )
        }
        var eachArticle = this.state.EachArticle
        var AllArticles = this.state.AllArticles
        return(
            <div>
                {
                    this.props.isLogged ? <AuthenticatedIndividualArticle 
                    {...this.state}
                    indiProps = {this.props}
                    eachArticle={eachArticle} 
                    TenArticles={AllArticles} 
                    handleComment={this.handleComment}
                    handleSubmit={this.handleSubmit}
                    handleFavorite={this.handleFavorite} 
                    handleUnvorite={this.handleUnvorite}
                    onUpdateArticle={this.props.onUpdateArticle}
                    slug = {this.props.match.params}
                    fetchGetComments = {this.fetchGetComments}
                    /> 
                    : 
                    <UnAuthenticatedIndividualArticle 
                    {...this.state} 
                    eachArticle={eachArticle} />
                }
            </div>
        )
    }
}

function AuthenticatedIndividualArticle(props){
    var fav = []
    var {eachArticle, handleFavorite, handleUnvorite, fetchGetComments,indiProps } = props;
    
    indiProps.favortedArticles.forEach((each) => {
        if(each.slug === eachArticle.slug){
            return fav.push(each)
        }
    })
    var favor = fav[0];
    return(
        <>
            <div className="container">
                <div className="space-y-4 mt-8 mb-28">
                    <article key={eachArticle.slug}>
                        <div>
                            <img className="shadow-sm" src={"/images/articles_images/"+eachArticle.slug+".png"} alt="" />
                            <div className="ml-10">
                                
                                <div className="w-1/12 border rounded-full p-2  relative -mt-16 bg-white shadow-md">
                                    <img className="rounded-full w-fullm-auto" src={eachArticle.author.image} alt="" />
                                </div>
                                <div className="mt-4 w-2/12 flex items-center">
                                    <div>
                                        <h3 className="text-2xl font-extrabold">{eachArticle.author.username}</h3>
                                        <h4 >{eachArticle.author.bio}</h4>
                                    </div>

                                    <div className="flex ml-4">

                                        {
                                            favor  ? <p onClick={() => handleUnvorite(eachArticle.slug)} className="cursor-pointer"><i className="fas fa-heart"></i></p> :  <p onClick={() => handleFavorite(eachArticle.slug)} className="cursor-pointer"><img style={{width:"25px" , display:"inline-block"}} src="https://cdn-icons-png.flaticon.com/512/263/263417.png" alt="" /></p>
                                        }
                                        {
                                            // !favor ? <p onClick={() => handleFavorite(eachArticle.slug)} className="cursor-pointer"><img style={{width:"25px" , display:"inline-block"}} src="https://cdn-icons-png.flaticon.com/512/263/263417.png" alt="" /></p> : ""
                                        }

                                    </div>
                                </div>
    
                            </div>

                            <div className="mt-8">
                                <NavLink to={`/articles/${eachArticle.slug}`}>
                                    <div className="flex items-center">
                                        <h2 className="text-xl font-extrabold">{eachArticle.title}</h2>
                                    </div>
                                </NavLink>
                                <h3 className="text-sm my-1">{eachArticle.body}</h3>
                                <h3 className="mt-4 font-extrabold text-lg">Description</h3>
                                <p className="text-sm">{eachArticle.description}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

                <div>
                    <Comments {...props} eachArticle={eachArticle}  onUpdateArticle={props.onUpdateArticle} slug={props.slug} fetchGetComments={fetchGetComments} />
                </div>
        </>
    )
}

function UnAuthenticatedIndividualArticle(props){
    var {eachArticle} = props;
    return(
        <>
            <div className="container">
                <div className="space-y-4 mt-8 mb-40">
                    <article key={eachArticle.slug}>
                        <div>
                            <img className="shadow-sm" src={"/images/articles_images/"+eachArticle.slug+".png"} alt="" />
                            <div className="ml-10">
                                
                                <div className="w-1/12 border rounded-full p-2  relative -mt-16 bg-white shadow-md">
                                    <img className="rounded-full w-fullm-auto" src={eachArticle.author.image} alt="" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-2xl font-extrabold">{eachArticle.author.username}</h3>
                                    <h4>{eachArticle.author.bio}</h4>        
                                </div>   
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-extrabold">{eachArticle.title}</h2>
                                </div>
                                <h3>{eachArticle.body}</h3>
                                <h3 className="mt-4 font-extrabold text-xl">Description</h3>
                                <p>{eachArticle.description}</p>
                            </div>
                        </div>

                    </article>

                    <div className=" w-6/12 m-auto mt-20 text-center">
                        <NavLink to="/users/login">
                            <p className="text-green-400">Sign In</p>
                        </NavLink>
                        <p className="mx-3">Or</p>
                        <NavLink to="/users">
                            <p className="text-green-400">Sign Up</p>
                        </NavLink>
                        <p className="ml-2">To add comments on this article.</p>
                    </div>
                    
                </div>
             </div>
        </>
    )
}
export default withRouter(IndividualArticle);  