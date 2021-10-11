import React from 'react';
import { withRouter } from 'react-router';
import {api,ArticleApi} from '../utls/ApiLinks';
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
        this.FetchTenArticles();
        this.fetchGetComments();
    }
    // componentDidUpdate(_prevProps, prevState){
    //     if(this.state.allcomments !== prevState.allcomments){
    //         this.FetchEachArticle();
    //     }
    // }
    FetchEachArticle = () => {
        var {slug} = this.props.match.params;
        // console.log(slug)
        fetch(ArticleApi + `/${slug}`).then((res) => {
           return res.json()
        }).then((articleData) => {
            console.log(articleData.article, "each Article data")
            this.setState({
                EachArticle : articleData.article,
                isLoading  : false,
            })
        }).catch(err => console.log(err));
    }

    FetchTenArticles = () => {
        fetch(ArticleApi).then((res)=> res.json()).then((articlesData) => {
            this.setState({
                AllArticles : articlesData.articles,
                isLoading : false,
            })
        })
    }

    AddFavorite = (slug) => {
        // var {slug} = this.props.match.params
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
                // window.location.reload();
              }
            }).then((data) => {
                console.log(data)
                this.setState({
                    EachArticle : data.article
                })
            })
            .catch((errors) => {
              console.log(errors);
            });
    }

    removeFavorite = (slug) => {
        // var {slug} = this.props.match.params
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
                  } else {
                    console.log(res.json());
                  }
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
            // console.log(this.state.allcomments)
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
        // console.log(this.props)
        var isLoading = this.state.isLoading;
        if(isLoading){
            return (
                <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
            )
        }
        var eachArticle = this.state.EachArticle
        var AllArticles = this.state.AllArticles
        console.log(eachArticle)
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
    // var onUpdateArticle = props.onUpdateArticle
    var {eachArticle, TenArticles, handleFavorite, handleUnvorite, onUpdateArticle, fetchGetComments , indiProps} = props
    var numbers = [1,2,3,4,5,6,7,8,9,10];
    var randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
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
                                            // eachArticle.favorited === true ? <p><i className={props.favorited ? `fas fa-heart text-red-500` : `fas fa-heart`} onClick={() => handleFavorite(eachArticle.slug)}></i></p> :  <p><i className={props.favorited ?  `fas fa-heart text-red-500` : `fas fa-heart`} onClick={() => handleFavorite(eachArticle.slug)}></i></p>
                                        }
                                        <p onClick={() => handleFavorite(eachArticle.slug)} className="cursor-pointer"><i className={props.favorite === 'favorite' ? 'far fa-heart text-red-500' : 'far fa-heart'}></i></p>
                                        <p onClick={() => handleUnvorite(eachArticle.slug)} className="cursor-pointer"><i className={props.favorite === 'unfavorite' ? `far fa-heart text-black ml-2` : `fas fa-heart ml-2`} ></i></p>
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


            {/* <div className="container flex flex-wrap justify-between">
                 {
                    TenArticles.map((each) => (
                        <article key={each.slug} className="border my-3 w-5/12 space-y-4 m-5 rounded-xl shadow-md relative article">
                            <img src={"/images/articles_images/"+each.slug+".png"} alt="" />
                            <div className="px-4">
                                <h2 className="font-bold">{each.title}</h2>
                                <p className="text-sm">{(each.description).slice(0,120)} . . . .</p>
                                <NavLink to={`/articles/${each.slug}`}>
                                    <button className="py-1 rounded-lg px-4 my-6 bg-black text-white">Read More</button>
                                </NavLink>

                                <NavLink to={`/profiles/${each.author.username}`}>
                                    <div className="w-3/12 flex justify-center items-center absolute right-2 bottom-2">
                                        <small className="font-bold">{each.author.username}</small>
                                        <img src={each.author.image} alt="" className="w-3/12 rounded-full ml-4" />
                                    </div>
                                </NavLink>
                            </div>
                        </article>
                    )).slice(randomNumber,15)
                 }

             </div> */}
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