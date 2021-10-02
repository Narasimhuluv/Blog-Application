import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import {ArticleApi} from '../utls/ApiLinks'

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            eachuserData : [],
            CountNumber : null,
        };
    }


    componentDidMount(){
        this.FetchUserArticles();
    }
    FetchUserArticles = () => {
        fetch(ArticleApi+ `?author=vasam`)
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                eachuserData : data,
                CountNumber : data.articlesCount

            })
        })
    }

    render(){
        var user = this.props.user.user;
        console.log(user)
        var eachuserData = this.state.eachuserData;
        console.log(eachuserData)
        console.log(this.state.CountNumber)
        return (
            <div className="container">
                <article className="rounded-md overflow-hidden shadow-sm my-3">
                    <img src="/images/profile.png" className="w-full" />
    
                    <div className="flex justify-center -mt-12">
                        {/* <img src="https://i.imgur.com/8Km9tLL.jpg" className="border rounded-md border-white -mt-3 w-28" />		 */}
                        <img src={user.image} className="border rounded-md border-white  -mt-3 w-28" />		
                    </div>
                    
                    <div className="text-center px-3 pb-6 pt-2">
                        <h3 className="text-lg font-extrabold font-sans">{user.username}</h3>
                        <p className="mt-2 font-sans font-light ">{user.email}</p>
                        <p className="mt-2 font-sans font-light ">{user.bio}</p>
                    </div>
                    <div className="w-2/12  flex m-auto font-light">
                        <div className="w-11/12  text-center">
                            <h5>Articles</h5>
                            <h4>{this.state.CountNumber}</h4>
                        </div>

                        <div className="w-11/12 border-l-2  text-center">
                            <h5>Followers</h5>
                            <h4>{this.state.CountNumber}</h4>
                        </div>
                    </div>
    
                   <NavLink to="/user">
                        <div className="w-1/12 m-auto mt-6">
                            <img className="w-4/12 m-auto" src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png" alt="" />
                        </div>
                   </NavLink>
                </article>
                
                
                <article>
                    {/* {
                        eachuserData.map((eachArticle) => (
                            <h2></h2>
                        ))
                    } */}
                </article>
            </div>
        )
    }
}

export default withRouter(Profile);
