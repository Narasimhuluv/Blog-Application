import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import IndividualArticle from './IndividualArticle';
import Login from './Login';
import Register from './Register';
import NotFound  from './NotFound';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLogged : false,
            user : null,
            isVerifying: true,
        }
    }
    onUpdateUser = (userData) => {
        this.setState({
            isLogged : true,
            user : userData,
            isVerifying : false
        })
        localStorage.setItem("token" , userData.token)
    }
    render(){
        return(
            <div>
                <Header {...this.state}/>
                {/* <Switch>
                    <Route exact path="/users" component={Register} />

                    <Route exact path="/users/login">
                        <Login {...this.state} onUpdateUser={this.onUpdateUser}/>
                    </Route>

                    <Route exact path="/">
                        <Home {...this.state}/>
                    </Route>

                    <Route exact path="/articles/:slug" component={IndividualArticle} />

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch> */}
                {
                    this.state.isLogged ? <Athenticated  {...this.state} onUpdateUser={this.onUpdateUser}/> : <UnAthenticated {...this.state} onUpdateUser={this.onUpdateUser} />
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

            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    )
}



export default App;