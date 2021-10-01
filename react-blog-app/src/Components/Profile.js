import React from 'react'

function Profile() {
    return (
        <div className="container">
            <div className="rounded-md overflow-hidden shadow-sm my-3">
                <img src="/images/profile.png" className="w-full" />

                <div className="flex justify-center -mt-12">
                    <img src="https://i.imgur.com/8Km9tLL.jpg" className="border border-white border-2 -mt-3 w-28" />		
                </div>
                
                <div className="text-center px-3 pb-6 pt-2">
                    <h3 className="text-sm bold font-sans">Olivia Dunham</h3>
                    <p className="mt-2 font-sans font-light ">Hello, i'm from another the other side!</p>
                </div>

                <div className="flex justify-center pb-3 ">
                    <div className="text-center mr-3 border-r pr-3">
                        <h2>34</h2>
                        <span>Photos</span>
                    </div>
                    <div className="text-center">
                        <h2>42</h2>
                        <span>Friends</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
