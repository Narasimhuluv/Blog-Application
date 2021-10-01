import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import IndividualArticle from './IndividualArticle';
import Login from './Login';
import Register from './Register';
import NotFound  from './NotFound';
import { localStoragekey, userVerify } from '../utls/ApiLinks';
import NewArticle from './NewArticle';
import Profile from './Profile';
import Settings from './Settings';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLogged : false,
            user : null,
            isVerifying: true,
        }
    }

    componentDidMount(){
        var storagekey = localStorage[localStoragekey]
        if(storagekey){
            fetch(userVerify, {
                method : 'GET',
                headers : {
                    authorization : `Token ${storagekey}`,
                }, 
            }).then(res => {
                if(res.ok){
                    return res.json();
                }
                return res.json().then(({errors}) => {
                    return Promise.reject(errors)
                })
            }).then((user) => this.onUpdateUser(user))
            .catch(errors => console.log(errors))
        }else{
            this.setState({
                isVerifying : false,
            })
        }
    }

    onUpdateUser = (userData) => {
        this.setState({
            isLogged : true,
            user : userData,
            isVerifying : false
        })
        localStorage.setItem(localStoragekey , userData.token)
    }
    render(){
        if(this.state.isVerifying){
            return (
                <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
            )
        }
        return(
            <div>
                <Header {...this.state}/>
                {
                    this.state.isLogged ? 
                    <Athenticated  {...this.state} onUpdateUser={this.onUpdateUser}/> 
                    : 
                    <UnAthenticated {...this.state} onUpdateUser={this.onUpdateUser} />
                }
            </div>
        )
    }
}
function UnAthenticated(props){
    return(
        <Switch>
            <Route exact path="/users" component={Register} />

            {/* <Route exact path="/users/login" component={Login} /> */}

            <Route exact path="/users/login">
                <Login {...props} onUpdateUser={props.onUpdateUser}/>
            </Route>

            <Route exact path="/">
                <Home {...props}/>
            </Route>

            <Route exact path="/articles/:slug" component={IndividualArticle} />

            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    )
}

function Athenticated(props){
    // console.log(props.user , "i am consoling user data")
    return(
        <Switch>
            {/* <Route exact path="/users" component={Register} /> */}

            {/* <Route exact path="/users/login" component={Login} /> */}

            {/* <Route exact path="/users/login">
                <Login {...this.state} onUpdateUser={this.onUpdateUser}/>
            </Route> */}

            <Route exact path="/">
                <Home {...props}/>
            </Route>

            <Route exact path="/articles/:slug" component={IndividualArticle} />
            <Route exact path="/articles">
                <NewArticle />
            </Route>

            <Route exact path="/profiles">
                <Profile />
            </Route>
            <Route exact path="/settings">
                <Settings />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    )
}



export default App;