import React from 'react'

class NewArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title : "",
            description : "",
            content : "",
            tags : "",
        }
    }
    render(){

        return (
            <div className="container">
                <form action="" className="border w-9/12 m-auto p-5 mt-10 rounded-lg">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-700">Add Article</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                    </div>
                    <fieldset>
                       <div className="flex w-full justify-between">
                            <div className="w-6/12 mx-2">
                                <label htmlFor="Title" className="block leading-7 text-sm text-gray-600">Title</label>
                                <input type="text" id="name" name="title" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="w-6/12 mx-2">
                                <label htmlFor="Description" className="block leading-7 text-sm text-gray-600">Description</label>
                                <input type="text" id="name" name="description" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                       </div>
    
                        <div className="mx-2">
                            <label htmlFor="Content" className="block leading-7 text-sm text-gray-600">Content</label>
                            <textarea id="message" name="content" class="w-full bg-gray-100 bg-opacity-50  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-60 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
    
                         <div className="flex items-end">
                            <div className="w-6/12  mx-2">
                                <label htmlFor="Tags" className="block leading-7 text-sm text-gray-600">Tags</label>
                                <input type="text" id="name" name="tags" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <input type="submit" className="cursor-pointer text-white h-10 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" />
                         </div>
    
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default NewArticle
