import React from 'react'
import {NavLink} from 'react-router-dom';

function Hero(props) {
    return (
        <section className="hero">
            <article className="container flex items-center justify-between">
                <div className=" w-6/12 space-y-6">

                    <h2 className="Home_heading w-8/12 text-4xl font-extrabold">Blog App is a Place to write, read, and Connect</h2>
                    <p className="my-4 w-8/12 text-lg">It's easy and free to post your thinking on any topic and connect with millions of readers.</p>

                    {
                        props.Logged ? (
                            <NavLink to="/articles">
                                <button className="px-4 py-2 mt-6 text-white bg-black rounded-lg">Start Writing</button>
                            </NavLink>
                        ) : (
                            <NavLink to="/users/login">
                                <button className="px-4 py-2 mt-6 text-white bg-black rounded-lg">Start Writing</button>
                            </NavLink>
                        )
                    }
                    
                </div>

                <div className=" w-6/12">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_4o6wnb3t.json"  background="transparent"  speed="1" style={{width : "100%",}}  loop  autoplay></lottie-player>
                </div>
            </article>
        </section>
    )
}

export default Hero
