import React,{useEffect} from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import {ArticleApi, localStoragekey} from '../utls/ApiLinks';
import moment from 'moment';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Aos from 'aos';
import 'aos/dist/aos.css';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            activeTab : "active",
            eachuserData : [],
            CountNumber : null,
            isLoading : true,
            favortedArticles : [],
            favortedArticlesCount : ""
        };
    }

    componentDidMount(){
        this.FetchUserArticles();
    }
    FetchUserArticles = () => {
        fetch(ArticleApi+ `?author=${this.props.user.user.username}`)
        .then((res) => {
            if(!res.ok){
                throw new Error('Can not fetch data for specific user!')
            }else{
                return res.json();
            }
        })
        .then((data) => {
            this.setState({
                eachuserData : data.articles,
                CountNumber : data.articlesCount,
                isLoading : false,
                activeTab : "active",
            })
        }).catch((err) => {
            this.setState({
                err : 'Not able to fetch articles'
            })
        })
    }

    DeleteArticle = (slug) => {
        // var {slug} = this.props.match.params
        var storagekey = localStorage[localStoragekey]
        if(storagekey){
            fetch(ArticleApi + `/${slug}`, {
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
            }).then((res) => res.json())
              .then((updatedArticle) =>  {
                this.props.onUpdateArticle(updatedArticle)
                this.props.history.push('/')
                this.FetchUserArticles()
            })
        }
    }
    FavoritedArticleData = (username) => {
        var storagekey = localStorage[localStoragekey];
        if(storagekey){
            fetch(ArticleApi + `/?favorited=${username}`,{
                method : 'GET',
                headers : {
                    authorization : `Token ${storagekey}`,
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
                console.log(favoriteArticleData.articlesCount)
                this.setState({
                    isLoading : false,
                    favortedArticles : favoriteArticleData.articles,
                    favortedArticlesCount : favoriteArticleData.articlesCount,
                    activeTab : "favorited",
                })
            })
        }
    }

    updateCurrentPageIndex = (each) => {
        this.setState({
            activeIndexPage : each,
        }, this.FetchAllArticles)
    }


    deleteArticle = (slug) => {
        this.DeleteArticle(slug);
    }

    FavoritedArticle = (username) => {
        this.FavoritedArticleData(username);
        this.setState({
            activeTab : "favorited"
        })
    }

    myArticles = () => {
        this.setState({
            activeTab : "active"
        })
    }

    render(){
        var isLoading = this.state.isLoading
        if(isLoading){
            return (
                <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
            )
        }
        var user = this.props.user.user;
        var eachuserData = this.state.eachuserData;
        var fav = this.state.favortedArticles
        return (
            <div className="container">
                <article className="rounded-md overflow-hidden  my-3">
                    <img src="/images/profile.png" className="w-full" alt="background-img" />
    
                    <div className="flex justify-center -mt-12">
                        <img src={user.image} className="border rounded-md border-white  -mt-3 w-28" alt="profile_image" />		
                    </div>
                    
                    <div className="text-center px-3 pb-6 pt-2">
                        <h3 className="text-lg font-extrabold font-sans">{user.username}</h3>
                        <p className="mt-2 font-sans font-light ">{user.email}</p>
                        <p className="mt-2 font-sans font-light ">{user.bio}</p>
                    </div>
                    <div className="w-2/12  flex m-auto font-light">
                        <div className="w-11/12  text-center">
                            <h5>Articles</h5>
                            <h4 className="font-extrabold">{this.state.CountNumber}</h4>
                        </div>

                        <div className="w-11/12 border-l-2  text-center">
                            <h5>Social Media</h5>
                            <div className="flex justify-between p-2">
                                <a href="https://github.com/Narasimhuluv"><img className="w-6" src="https://cdn-icons-png.flaticon.com/512/270/270798.png" alt="" /></a>
                                <a href="https://twitter.com/NarasimhuluV7"><img className="w-6" src="https://cdn-icons.flaticon.com/png/512/3025/premium/3025462.png?token=exp=1633928991~hmac=c9eaade5985b20c67a3ad09e88bb3157" alt="" /></a>
                                <a href="https://www.linkedin.com/in/vasam-narasimhulu-8085901b3/"><img className="w-6" src="https://cdn-icons.flaticon.com/png/512/1377/premium/1377213.png?token=exp=1633929042~hmac=c67b527f3b4a2b0a724db4ebb2cdba2f" alt="" /></a>
                            </div>
                        </div>
                    </div>
    
                   <NavLink to="/user">
                        <div className="w-1/12 m-auto mt-6">
                            <img className="w-4/12 m-auto" src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png" alt="" />
                        </div>
                   </NavLink>
                </article>

                <div>
                    <button className={this.state.activeTab === "active" ? `border-b-2 border-green-500 px-1 py-1` : `border-b-2 px-1 py-1`} onClick={this.myArticles}>MyArticles</button>
                    <button className={this.state.activeTab === "favorited" ? `border-b-2 border-green-500 px-1 py-1 ml-4` : `border-b-2 px-1 py-1 ml-4`} onClick={() => this.FavoritedArticle(user.username)}>Favorited Articles</button>
                </div>
                
                
                <div className="mt-10 flex flex-wrap">
                   {
                       this.state.activeTab === "active" ? (
                        eachuserData.map((each) => (

                            <UserArticle each={each}/>
                            
                       ))
                       ) : ""
                   }

                   {
                       this.state.activeTab === "favorited" ? (
                        fav.map((each) => (

                                <FavoritedArticle  each={each}/>
                                
                       ))
                       ) : ""
                   }
                </div>
            </div>
        )
    }
}

function UserArticle(props){

    useEffect(() => {
        Aos.init({duration : 2000});
    },[])
    var {each} = props
    return(
        <>
            <article className="container  px-8 py-4 m-auto bg-white rounded-lg shadow-md border dark:bg-gray-800 my-10 each_article_top user_article" data-aos="zoom-in">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{moment(each.createdAt).format('L')}</span>
                    <div className="flex">
                        <NavLink to={`/articles/${each.slug}/update`}>
                                <p><i className="far fa-edit ml-5 cursor-pointer text-xl text-yellow-500"></i></p>
                        </NavLink>

                            <DeleteSweepIcon className="ml-3 cursor-pointer text-xl text-red-400" onClick={() => this.deleteArticle(each.slug)} />
                            {/* <p><i className="far fa-delete ml-5 cursor-pointer text-xl text-yellow-700"></i></p> */}
                    </div>
                </div>
        
                <div className="mt-2">
                    <p className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{each.title}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{(each.description).slice(0,99)} . . . . </p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                    <NavLink to={`/articles/${each.slug}`} >
                        <p  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Read more</p>
                    </NavLink>
                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={each.author.image} alt="avatar" />
                        <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">{each.author.username}</p>
                    </div>
                </div> 
            </article>

        </>
    )
}


function FavoritedArticle(props){
    var {each} = props
    useEffect(() => {
        Aos.init({duration : 1000});
    },[])
    return(
        <>
            <article className="container  px-8 py-4 m-auto bg-white rounded-lg shadow-md border dark:bg-gray-800 my-10 each_article_top" data-aos="zoom-in-right">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{moment(each.createdAt).format('L')}</span>
                </div>
        
                <div className="mt-2">
                    <p className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{(each.title).slice(0,40)} . . . . .</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300"> {(each.description).slice(0,68)}. . . . </p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                    <NavLink to={`/articles/${each.slug}`} >
                        <p  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Read more . . . .</p>
                    </NavLink>

                    <NavLink to={`/profiles/${each.author.username}`}>
                        <div className="flex items-center">
                            <img className="hidden object-cover w-5 h-5 mx-4 rounded-full sm:block" src={each.author.image} alt="avatar" />
                            <p className="font-bold text-gray-700 cursor-pointer text-sm dark:text-gray-200">{each.author.username}</p>
                        </div>
                    </NavLink>
                </div> 
            </article>

        </>
    )
}

export default withRouter(Profile);
