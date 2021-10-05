import React from 'react';
import { withRouter } from 'react-router';
import {ArticleApi} from '../utls/ApiLinks';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { NavLink } from 'react-router-dom';


class IndividualArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            EachArticle : [],
            AllArticles : [],
            isLoading : true,
        }
    }
    componentDidMount(){
        this.FetchEachArticle();
        this.FetchTenArticles();
    }
    FetchEachArticle = () => {
        var {slug} = this.props.match.params;
        // console.log(slug)
        fetch(ArticleApi + `/${slug}`).then((res) => {
           return res.json()
        }).then((articleData) => {
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
                // isLoading : false,
            })
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
                    this.props.isLogged ? <AuthenticatedIndividualArticle {...this.props} eachArticle={eachArticle} TenArticles={AllArticles} /> : <UnAuthenticatedIndividualArticle {...this.props} eachArticle={eachArticle} />
                }
            </div>
        )
    }
}

function AuthenticatedIndividualArticle(props){
    var {eachArticle, TenArticles} = props
    // console.log(props.TenArticles, "TenArticles")
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
                                <div className="mt-4">
                                    <h3 className="text-2xl font-extrabold">{eachArticle.author.username}</h3>
                                    <h4 >{eachArticle.author.bio}</h4>
                                    
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


             <div className="container flex flex-wrap justify-between">
                 {
                    TenArticles.map((each) => (
                        <article key={each.slug} className="border my-3 w-5/12 space-y-4 m-5 rounded-xl shadow-md relative article">
                            <img src={"/images/articles_images/"+each.slug+".png"} alt="" />
                            <div className="px-4">
                                <h2 className="font-bold">{each.title}</h2>
                                <p className="text-sm">{(each.description).slice(0,190)} . . . .</p>
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
                            <img className="shadow-sm" src={"/images/articles_images/"+eachArticle.slug+".png" || `/images/profile.png`} alt="" />
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
                                    {/* <p><i className="far fa-edit text-black ml-5 cursor-pointer text-xl"></i></p> */}
                                </div>
                                <h3>{eachArticle.body}</h3>
                                <h3 className="mt-4 font-extrabold text-xl">Description</h3>
                                <p>{eachArticle.description}</p>
                            </div>
                        </div>
                    </article>
                </div>
             </div>
        </>
    )
}
export default withRouter(IndividualArticle); 