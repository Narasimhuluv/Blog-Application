import React from 'react';
import { NavLink } from 'react-router-dom';
import {api,ArticleApi} from '../utls/ApiLinks'
import AllArticles from './AllArticles';
import AllTags from './AllTags';
import Hero from './Hero';
import Pagination from './Pagination';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading : true,
            articles : [],
            tagName : "",
            // filters 
            articlesPerPage : 10,
            articleCount : 0,
            activeIndexPage : 1,
            // activeTab
            activeTab : "",
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
        }
    }

    updateCurrentPageIndex = (each) => {
        this.setState({
            activeIndexPage : each,
        }, this.FetchAllArticles)
    }
    handleTagArticle = async (each) => {
       await this.setState({
            tagName : each,
            activeTab : each,
        }, this.FetchAllArticles())
    }

    globalFeed = () => {
        this.setState({
            tagName : ""
        })
    }
    render(){
        var displayAllArticles = [];
        var allArticles = this.state.articles
        var isLoading = this.state.isLoading
        var tagsName = this.state.tagName
        console.log(tagsName)

        // if(!tagsName){
        //     displayAllArticles  = allArticles
        // }else{
        //     allArticles.map((each) => {
        //         each.tagList.map((eachTag) => {
        //             if(eachTag === tagsName){
        //                 return displayAllArticles.push(each)
        //             }
        //         })
        //     })
        // }
        // console.log(displayAllArticles)
        
        if(isLoading){
            return (
                <img className="m-auto mt-52 w-3/12" src="/images/loading.gif" alt="" />
            )
        }
        var activeTab = this.state.activeTab
        return(
            <section>
                <div>
                    <Hero />


                    {/* Global Feed  */}
                    <div className="flex items-center global_eachTag">
                        <NavLink to="/">
                            <h2 className="ml-20 text-xl font-extrabold mb-2" onClick={this.globalFeed}>Global Feed</h2>
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
                                    <AllArticles {...this.state} each={each}/>
                                ))
                            }
                        </div>
                        <AllTags {...this.state} handleTag={this.handleTagArticle}/>
                    </div>  
                    {/* ArticlesData End */}

                </div>
                    {/* Pagination  */}
                    <div className="pagination">
                        <Pagination {...this.state} updateCurrentIndex={this.updateCurrentPageIndex}/>
                    </div>
                    {/* Pagination  End*/}
            </section>
        )
    }
}
export default Home