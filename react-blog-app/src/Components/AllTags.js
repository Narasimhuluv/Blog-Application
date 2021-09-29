import React from 'react';
import { api, ArticleApi, tagsUrl } from '../utls/ApiLinks';
class AllTags extends React.Component{
    constructor(){
        super();
        this.state={
            allTags : [], 
        }
    }
    componentDidMount(){
        this.FetchAllTags()
    }
    FetchAllTags = () => {
        fetch(tagsUrl).then((res) => res.json()).then((alltags) => {
            this.setState({
                allTags : alltags.tags,
            })
        })
    }
    render(){
        var {articles, activeTab} = this.props
        var tags = this.state.allTags
        // filterTags 
        var filterTags = tags.filter((elem, index) => {
            return tags.indexOf(elem) === index
        })
        return(
            <div className="w-4/12">
                <h2 className="m-4 text-xl font-extrabold">Popular Tags</h2>
                <div className="p-1">
                    <div className=" flex justify-between flex-wrap">
                        {
                            filterTags.map((each) => (
                                each === "" ? null : <button key={each} className={each === true ? "border py-1 px-4 m-1 bg-yellow-500 rounded-lg shadow-md": "border py-1 px-4 m-1 rounded-lg shadow-md"  }  onClick={() => this.props.handleTag(each)}>{each}</button>
                            ))
                        }
                        {/* className="border py-1 px-4 m-1 rounded-lg shadow-md"  */}
                    </div>
                </div>
            </div>
        )
    }
}

export default AllTags;
