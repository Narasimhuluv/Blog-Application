import React from 'react';
import {ArticleApi} from '../utls/ApiLinks';

class IndividualArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allArticles : [],
            isLoading : true,
        }
    }
    componentDidMount(){
        this.FetchAllArticle()
    }
    FetchAllArticle = () => {
        var {slug} = this.props.match.params
        console.log(slug)
        fetch(ArticleApi + `/${slug}`).then((res) => {
            if(!res.ok){
                //  throw new Error("Something went Wrong")
                console.log(Error, "hellow Shishupal")
            }else{
                return res.json()
            }
        }).then((articleData) => {
            this.setState({
                allArticles : articleData.article,
                isLoading  : false,
            })
        }).catch(err => console.log(err));
    }
        render(){
        console.log(this.props , "props")
        console.log(this.state.allArticles)
        var isLoading = this.state.isLoading

        if(isLoading){
            return (
                <img className="m-auto mt-52 w-3/12" src="/images/loading.gif" alt="" />
            )
        }
        var eachArticle = this.state.allArticles
        return(
            <div>
                <div className="container">
                    <div className="space-y-4 mt-8 mb-40">
                        <article key={this.state.allArticles.slug}>
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
                                    <h2 className="text-2xl font-extrabold">{eachArticle.title}</h2>
                                    <h3>{eachArticle.body}</h3>
                                    <h3 className="mt-4 font-extrabold text-xl">Description</h3>
                                    <p>{eachArticle.description}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}
export default IndividualArticle; 