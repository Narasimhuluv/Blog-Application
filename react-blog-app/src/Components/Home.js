// import { ThreeSixty } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {api,ArticleApi} from '../utls/ApiLinks'
import AllArticles from './AllArticles';
import AllTags from './AllTags';
import Hero from './Hero';
import Pagination from './Pagination';
import {localStoragekey} from '../utls/ApiLinks'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading : true,
            articles : [],
            feeddata : [],
            tagName : "",
            // filters 
            articlesPerPage : 10,
            articleCount : 0,
            activeIndexPage : 1,
            // activeTab
            activeTab : "",
            countLikes : 0,
        }
    }
    componentDidMount(){
        this.FetchAllArticles()
    }


    FetchAllArticles=()=> {     
        var limit = this.state.articlesPerPage
        var offset = (this.state.activeIndexPage - 1) * 10
        let tag = this.state.tagName
        fetch(ArticleApi + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`) ).then((res) => res.json()).then((articlesData) => {
            this.setState({
                articles : articlesData.articles,
                isLoading : false,
                articleCount : articlesData.articlesCount
            })
        })
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.activeIndexPage !== this.state.activeIndexPage || prevState.tagName !== this.state.tagName) {
          this.FetchAllArticles();
          this.Feed();
        }
    }

    updateCurrentPageIndex = (each) => {
        this.setState({
            activeIndexPage : each,
        }, this.FetchAllArticles, this.Feed)
    }

    handleTagArticle = async (each) => {
       await this.setState({
            tagName : each,
            activeTab : each,
        }, this.FetchAllArticles, this.Feed)
    }
    // handleTagArticle =  ({target}) => {
    //     console.log(target ,"clicked")
    //     var {value} = target.dataset;
    //      this.setState({
    //          tagsName : value
    //      }, this.FetchAllArticles())
    //  }

    Feed = () => {
        // /api/articles/feed
        var limit = this.state.articlesPerPage
        var offset = (this.state.activeIndexPage - 1) * 10
        var storagekey = localStorage[localStoragekey]
        var tag = this.state.tagName
        if(storagekey){
                fetch(ArticleApi+ `/feed?/limit=${limit}&skip=${offset}`+ (tag && `&tag=${tag}`), {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json',
                  authorization : `Token ${storagekey}`
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify()
            }).then((res) => res.json())
            .then((feedData) => {
                console.log(feedData.articles)
                this.setState({
                    feeddata : feedData.articles,
                    activeTab : "feed"
                })
            })
        }
          
    }

    globalFeed = () => {
        this.setState({
            tagName : "",
            activeTab : ""
        },this.FetchAllArticles , this.Feed)
        
    }

    personalFeed = () => {
        this.Feed();
        this.setState({
            tagName : "",
            actvieTab : "feed",
        },this.FetchAllArticles, this.Feed)
    }

    handleAddCount = () => {
        this.setState({
            countLikes : this.state.countLikes + 1
        })
        console.log("counter clicked")
    }
    
    render(){
        var displayAllArticles = [];
        var allArticles = this.state.articles;
        var isLoading = this.state.isLoading;
        var tagsName = this.state.tagName;
        var feeddata = this.state.feeddata
        
        if(isLoading){
            return (
                <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
            )
        }
        var activeTab = this.state.activeTab
        return(
            <>
                {
                    this.props.isLogged ? 
                    <AuthenticatedHome {...this.state} globalFeed={this.globalFeed} activeTab={activeTab} personalFeed={this.personalFeed} feeddata={feeddata}
                    allArticles={allArticles} handleTag={this.handleTagArticle} updateCurrentIndex={this.updateCurrentPageIndex} handleAddCount={this.handleAddCount}/> 
                    :
                    <UnAthenticatedHome {...this.state} globalFeed={this.globalFeed} activeTab={activeTab} 
                    allArticles={allArticles} handleTag={this.handleTagArticle} updateCurrentIndex={this.updateCurrentPageIndex}/>
                }
            </>
        )
    }
}

function AuthenticatedHome(props){
    var {globalFeed, activeTab, allArticles, handleTag , updateCurrentIndex, personalFeed , handleAddCount, feeddata} = props
    console.log(activeTab)
    return(
        <section>
    <div>
        <Hero />

        {/* Global Feed  */}
        <div className="flex items-center global_eachTag">
           <div className="flex items-center">
                <NavLink to="/" activeClassName="text-yellow-700">
                    <h2 className="ml-20 text-lg font-extrabold mb-2" onClick={globalFeed}>Global Feed</h2>
                </NavLink>

                <NavLink to="/" activeClassName="text-yello-700">
                    <h2 className="ml-5 text-lg font-extrabold mb-2" onClick={personalFeed}>Personal Feed</h2>
                </NavLink>
           </div>

            <h2 className="ml-5 text-yellow-600 text-xl font-extrabold mb-2">{
                activeTab && (
                <NavLink activeClassName="ml-2 text-yellow-600 text-xl font-extrabold mb-2" to="/">
                    #{activeTab}
                </NavLink>  
                )    
            }</h2>
       </div>
       {/* Global Feed End */}

       {/* articlesData */}
        <div className="bg-gray-200 w-11/12 m-auto h-0.5"></div>
        <div className="w-full flex mt-10">
            <div className="w-8/12 flex justify-center flex-wrap ">
                {
                    activeTab === "" ? (
                        allArticles.map((each) => (
                            <AllArticles {...props} each={each} handleAddCount={handleAddCount}/>
                        ))
                    ) : ""
                }

                {
                    activeTab === 'feed' ? (
                        feeddata.map((each) => (
                            <article key={each.slug} className="border my-3 w-5/12 space-y-4 m-5 h-72 rounded-xl shadow-md relative overflow-hidden article">
                                <img src={"/images/articles_images/"+each.slug+".png"} alt="" />
                                <div className="px-4">
                                    <h2 className="font-bold">{each.title}</h2>
                                    <p className="text-sm">{(each.description).slice(0,120)} . . . .</p>
                                    <NavLink to={`/articles/${each.slug}`}>
                                        <button className="py-1 rounded-lg px-4 my-6 bg-black text-white">Read More</button>
                                    </NavLink>
                                    <NavLink to={`/profiles/${each.author.username}`}>
                                        <div className="w-3/12 flex justify-center items-center absolute right-3 bottom-2">
                                            <small className="font-bold">{each.author.username}</small>
                                            <img  src={each.author.image} alt="" className="w-3/12 rounded-full ml-4" />
                                        </div>
                                    </NavLink>
                                </div>
                            </article>
                        ))
                    ) : ""
                }
            </div>
            <AllTags {...props} handleTag={handleTag}/>
        </div>  
        {/* ArticlesData End */}


        

    </div>
        {/* Pagination  */}
        <div className="pagination">
            <Pagination {...props} updateCurrentIndex={updateCurrentIndex}/>
        </div>
        {/* Pagination  End*/}
</section>
    )
}

function UnAthenticatedHome(props){
    var {globalFeed, activeTab, allArticles, handleTag , updateCurrentIndex} = props
    return(
        <section>
    <div>
        <Hero />

        {/* Global Feed  */}
        <div className="flex items-center global_eachTag">
            <NavLink to="/">
                <h2 className="ml-20 text-xl font-extrabold mb-2" onClick={globalFeed}>Global Feed</h2>
            </NavLink>
            <h2 className="ml-5 text-yellow-600 text-xl font-extrabold mb-2">{
                activeTab && (
                <NavLink activeClassName="ml-5 text-yellow-600 text-xl font-extrabold mb-2" to="/">
                    #{activeTab}
                </NavLink>  
                )    
            }</h2>
       </div>
       {/* Global Feed End */}

       {/* articlesData */}
        <div className="bg-gray-200 w-11/12 m-auto h-0.5"></div>
        <div className="w-full flex mt-10">
            <div className="w-8/12 flex justify-center flex-wrap ">
                {
                    allArticles.map((each) => (
                        <AllArticles {...props} each={each}/>
                    ))
                }
            </div>
            <AllTags {...props} handleTag={handleTag}/>
        </div>  
        {/* ArticlesData End */}

    </div>
        {/* Pagination  */}
        <div className="pagination">
            <Pagination {...props} updateCurrentIndex={updateCurrentIndex}/>
        </div>
        {/* Pagination  End*/}
</section>
    )
}
export default Home