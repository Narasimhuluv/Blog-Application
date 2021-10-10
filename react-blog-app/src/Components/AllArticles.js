import React from 'react';
import {NavLink} from 'react-router-dom';

function AllArticles(props) {
    var each = props.each
    var {handleAddCount} = props
    // console.log(handleAddCount)
    return (
        <>
            <article key={each.slug} className="border my-3 w-5/12 space-y-4 m-5 rounded-xl shadow-md h-72 relative overflow-hidden article">
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


                {/* <div className="absolute top-0 right-3">
                    <p onClick={handleAddCount} className="text-lg cursor-pointer"><i className="fab fa-gratipay"></i></p>
                    <p  >{props.countLikes >= 1 ? props.countLikes : null }</p>
                </div> */}
            </article>
        </>
    )
}

export default AllArticles
