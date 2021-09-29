import React from 'react'
import {NavLink} from 'react-router-dom'

function Header() {
    return (
        <header className="bg-green-100">
            <div className="container flex justify-between items-center">
                <div className="heading text-4xl font-extrabold text-pink-600 flex items-center">
                    <lottie-player className="lottie" src="https://assets10.lottiefiles.com/private_files/lf30_dezgszkb.json"  background="transparent"  speed="1" style={{width : "100px", height: "100px", display : "block"}}    loop  autoplay></lottie-player>
                    <NavLink to="/">
                        <h1>Blog App</h1>
                    </NavLink>
                </div>

                <div className="flex items-center">
                    <NavLink to="/login" activeClassName="bg-green-400 ml-8 text-white font-extrabold text-lg py-1 px-4 rounded-md">
                        <h3 className="font-extrabold text-lg">Sign in</h3>
                    </NavLink>
                    <NavLink to="/register" activeClassName="">
                        <h3 className="bg-green-400 ml-8 text-white font-extrabold text-center text-lg py-1 px-4 rounded-md">Sign Up</h3>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header
