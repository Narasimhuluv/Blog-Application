import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import {ArticleApi, localStoragekey} from '../utls/ApiLinks';
import moment from 'moment';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            eachuserData : [],
            CountNumber : null,
            isLoading : true,
        };
    }


    componentDidMount(){
        this.FetchUserArticles();
    }
    FetchUserArticles = () => {
        fetch(ArticleApi+ `?author=${this.props.user.user.username}`)
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                eachuserData : data.articles,
                CountNumber : data.articlesCount,
                isLoading : false,
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
                this.props.history.push('/')
            })
        }
    }
    deleteArticle = (slug) => {
        this.DeleteArticle(slug);
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
        console.log(eachuserData)
        console.log(this.state.CountNumber)
        return (
            <div className="container">
                <article className="rounded-md overflow-hidden  my-3">
                    <img src="/images/profile.png" className="w-full" />
    
                    <div className="flex justify-center -mt-12">
                        {/* <img src="https://i.imgur.com/8Km9tLL.jpg" className="border rounded-md border-white -mt-3 w-28" />	*/}
                        <img src={user.image} className="border rounded-md border-white  -mt-3 w-28" />		
                    </div>
                    
                    <div className="text-center px-3 pb-6 pt-2">
                        <h3 className="text-lg font-extrabold font-sans">{user.username}</h3>
                        <p className="mt-2 font-sans font-light ">{user.email}</p>
                        <p className="mt-2 font-sans font-light ">{user.bio}</p>
                    </div>
                    <div className="w-2/12  flex m-auto font-light">
                        <div className="w-11/12  text-center">
                            <h5>Articles</h5>
                            <h4>{this.state.CountNumber}</h4>
                        </div>

                        <div className="w-11/12 border-l-2  text-center">
                            <h5>Followers</h5>
                            <h4>{this.state.CountNumber}</h4>
                        </div>
                    </div>
    
                   <NavLink to="/user">
                        <div className="w-1/12 m-auto mt-6">
                            <img className="w-4/12 m-auto" src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png" alt="" />
                        </div>
                   </NavLink>
                </article>
                
                
                <div className="mt-10 flex flex-wrap">
                   {
                       eachuserData.map((each) => (
                            <article className="container  px-8 py-4 m-auto bg-white rounded-lg shadow-md border dark:bg-gray-800 my-10 each_article_top">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{moment(each.updatedAt).format('L')}</span>
                                   <div className="flex">
                                        <NavLink to={`/articles/${each.slug}/update`}>
                                                <p><i className="far fa-edit ml-5 cursor-pointer text-xl text-yellow-700"></i></p>
                                        </NavLink>

                                            <DeleteSweepIcon className="ml-3 cursor-pointer text-xl text-red-500" onClick={() => this.deleteArticle(each.slug)} />
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
                       ))
                   }
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);
