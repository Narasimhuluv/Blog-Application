import React from 'react';
import {NavLink} from 'react-router-dom';

function AllArticles(props) {
    var each = props.each
    return (
        <>
            <article key={each.slug} className="border my-3 w-5/12 space-y-4 m-5 h-80 rounded-xl shadow-md relative article">
                <img src={"/images/articles_images/"+each.slug+".png"} alt="" />
                <div className="px-4">
                    <h2 className="font-bold">{each.title}</h2>
                    <p className="text-sm">{(each.description).slice(0,190)} . . . .</p>
                    <NavLink to={`/articles/${each.slug}`}>
                        <button className="py-1 rounded-lg px-4 my-6 bg-black text-white">Read More</button>
                    </NavLink>
                    <div className="w-3/12 flex justify-center items-center absolute right-2 bottom-2">
                        <small>{each.author.username}</small>
                        <img src={each.author.image} alt="" className="w-3/12 rounded-full ml-4" />
                    </div>
                </div>
            </article>
        </>
    )
}

export default AllArticles
