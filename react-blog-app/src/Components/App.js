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
        this.state={}
    }
    render(){
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/articles/:slug" component={IndividualArticle} />

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        )
    }
}
export default App;