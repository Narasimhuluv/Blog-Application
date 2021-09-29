import React from 'react'
import { NavLink } from 'react-router-dom';
import {validations} from '../utls/Validation'

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '', 
            }
        }
    }
    handleChange = ({ target }) => {
        let { name, value } = target;
        let { errors } = this.state;
        validations(errors, name, value);
        this.setState({ [name]: value, errors });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
      };

        
    render(){
        let { email, password } = this.state.errors;
        return (
            <section className="container ">
                <div className="login flex justify-between items-center my-10">
                    <div className="w-6/12 ">
                        {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_q5pk6p1k.json"  background="transparent"  speed="1"  style={{width : "90%",}}  loop  autoplay></lottie-player> */}
                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_mragdxra.json"  background="transparent"  speed="1"  style={{width : "100%",}}  loop  autoplay></lottie-player>
                    </div>
                    <div className="w-6/12 m-auto">
                        <form action="" onSubmit={this.handleSubmit} className="border w-8/12 m-auto shadow-md p-6 py-20 rounded-xl">
                            {/* <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_hdiNFs.json"  background="transparent" style={{width : "60%",margin: "auto"}}  speed="1"  loop  autoplay></lottie-player> */}
                            <img className="w-4/12 h-1/6  m-auto mb-8" src="/images/placeholder.png" alt="" />
                            <h2 className="text-lg font-semibold ">Login With Your Details</h2>
                            <input type="email" placeholder="Enter Your Eamil" className="border my-2 w-full py-2 px-4 rounded-lg" name="email"  value={this.state.email} onChange={(e) => this.handleChange(e)} />
                            <span className="text-red-400">{email}</span>
                            <input type="password" placeholder="Enter Your Password" className="border my-4 w-full py-2 px-4 rounded-lg" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                            <span className="text-red-400">{password}</span>
                            <div className="w-full flex items-center mt-4">
                                <input type="Submit" className=" py-1 px-3 rounded-lg bg-black text-white "/>
                                <NavLink to="/register">
                                    <h6 className="w-full ml-1 text-center text-pink-700">Register ?</h6>
                                </NavLink>
                            </div>
                        </form> 
                    </div>
                </div>
            </section>
        )
    }
}   

export default Login
