import React from 'react';
import {withRouter} from 'react-router'
import {ArticleApi,localStoragekey} from '../utls/ApiLinks'

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            body : []
        }
    }
    
    fetchComments = () => {
        var {slug} = this.props.match.params;
        console.log(slug)
        var storagekey = localStorage[localStoragekey];
        if(storagekey){
            fetch(ArticleApi + `/${slug}/comments`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                body: JSON.stringify({
                    comment : {
                        body : this.state.body
                    }
                }) // body data type must match "Content-Type" header
            }).then((res) => res.json())
            .then((comment) => {
                this.props.onUpdateArticle(comment);
                this.props.history.push(`/articles/${slug}`)
                console.log(comment)
                this.setState({
                    body : ""
                })
            })
        }
    }

    fetchDeleteComments =   async (id) => {
        var {slug} = this.props.match.params;
        console.log(id)
        var storagekey = localStorage[localStoragekey];
       if(storagekey){
        await fetch(ArticleApi + `/${slug}/comments/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            authorization : `Token ${storagekey}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then((res) => res.json())
        .then((comment) => {
            this.props.onUpdateArticle(comment);
            this.props.history.push(`/articles/${slug}`)
            this.forceUpdate();
        })
       }
    }

    handleCommentDelete = (id) => {
        this.fetchDeleteComments(id);
        console.log("clicked deleted button")
    }

    handleComment = ({target}) => {
        var {name,value} = target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.fetchComments();
    }
    render(){
        var comments = this.props.allcomments
        console.log(comments)
        return(
            <>

            <div className="container w-full">
                <form action="" className="my-20" onSubmit={this.handleSubmit}>
                    <label htmlFor="Comments" className="ml-6 font-extrabold">Comments</label>
                    <input type="text" placeholder="leave your Comments" name="body" value={this.state.body} onChange={this.handleComment} className="border-b block py-2 px-4 font-light focus:outline-none mt-6 comment"/>
                </form>
                    {/* <textarea rows="2" name="body" value={props.body} onChange={handleComment} cols="30" placeholder="leave your Comments" className="border-b block py-2 px-4 font-light focus:outline-none mt-6 comment" /> */}

            </div>

            {/* display comments */}
                <div className="container w-8/12">
                    {
                        comments.map((eachComment) => (
                            <div className="w-full my-8 ">
                                <article key={eachComment.id} className="flex items-start mb-3 w-3/12 ">
                                    <img className="w-1/12 rounded-full" src={eachComment.author.image} alt="" />
                                    <div className='ml-4 -mt-1'>
                                        <h3 className='font-bold'>{eachComment.author.username}</h3>
                                        <p className="font-light">{eachComment.body}</p>
                                    </div>
                                </article>
                                <div className="flex items-center my-4">
                                    <p><i className="far fa-edit ml-5 cursor-pointer text-md text-yellow-700"></i></p>
                                    <p onClick={() => this.handleCommentDelete(eachComment.id)}><i class="fas fa-trash ml-4 text-md text-red-400 cursor-pointer"></i></p>
                                </div>
                                <hr />
                            </div>
                            
                        ))
                    }
                    
                </div>

            </>
        )
    }
}
export default withRouter(Comments)