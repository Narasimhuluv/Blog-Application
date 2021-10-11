import React from 'react'
import {NavLink} from 'react-router-dom'

function NotFound() {
    return (
        <div className="container h-full">
            <div className=" h-96 mt-44">
                <img src="/images/404page.gif" alt="" className="m-auto" />
                <p className="text-center text-2xl font-bold">Page Is Not Found</p>
               <NavLink to="/">
                   <button className="text-center text-xl font-extrabold border block  m-auto mt-4 py-1 px-3 rounded-lg bg-green-400 text-white"> ← Go Home</button>
               </NavLink>
            </div>
        </div>
    )
}

export default NotFound
