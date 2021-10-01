import React from 'react'
import { ArticleApi, localStoragekey } from '../utls/ApiLinks';
import {withRouter} from 'react-router'

class NewArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title : "",
            description : "",
            body : "",
            tags : "",
        }
    }

    // componentDidMount(){
    //     this.PostArticles();
    // }

    PostArticles = () => {
       var storagekey = localStorage[localStoragekey]
       if(storagekey){
        fetch(ArticleApi, {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers : {
                'Content-Type' : 'application/json',
                authorization :  `Token ${storagekey}`,
            },
            redirect : 'follow',
            referrerPolicy : 'no-referrer',
            body : JSON.stringify({
                article : {
                    title : this.state.title,
                    description : this.state.description,
                    body : this.state.body,
                    tags : this.state.tags 
                },
            }),
        }).then((res) => res.json())
            // if(!res.ok){
            //     return res.json.then(({errors}) => {
            //         return Promise.reject(errors)
            //     })
            // }
            // return res.json();
        // })
        .then((newArticleData) => {
            console.log(newArticleData)
            this.props.history.push('/')
            
        })
       }

    }

    handleChange = ({target}) => {
        var {name , value} = target
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.PostArticles();
    }
    render(){
        console.log(this.props)
        return (
            <div className="container">
                <form action="" onSubmit={this.handleSubmit} className="border w-9/12 m-auto p-5 mt-10 rounded-lg">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-700">Add Article</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
                    </div>
                    <fieldset>
                       <div className="flex w-full justify-between">
                            <div className="w-6/12 mx-2">
                                <label htmlFor="Title" className="block leading-7 text-sm text-gray-600">Title</label>
                                <input type="text" id="name" name="title" value={this.state.title} onChange={this.handleChange} class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="w-6/12 mx-2">
                                <label htmlFor="Description" className="block leading-7 text-sm text-gray-600">Description</label>
                                <input type="text" id="name" name="description" value={this.state.description} onChange={this.handleChange} class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                       </div>
    
                        <div className="mx-2">
                            <label htmlFor="Content" className="block leading-7 text-sm text-gray-600">Content</label>
                            <textarea id="message" name="body" value={this.state.body} onChange={this.handleChange} className="w-full bg-gray-100 bg-opacity-50  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-60 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
    
                         <div className="flex items-end">
                            <div className="w-6/12  mx-2">
                                <label htmlFor="Tags" className="block leading-7 text-sm text-gray-600">Tags</label>
                                <input type="text" id="name" name="tags" value={this.state.tags} onChange={this.handleChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <input type="submit" className="cursor-pointer text-white h-10 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" />
                         </div>
    
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default withRouter(NewArticle);
