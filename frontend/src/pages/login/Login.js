/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import logo from '../../assets/Images/finalLogo.png';

function Login(){
  
  const [email,SetEmail] = useState("")
  const [password,SetPassword] = useState("")
  console.log(email)
  console.log(password)

  const submitLogin = async () => {
    axios.post("http://127.0.0.1:8000/user/login/",email,password)
  }
    return(
      <section className="w-11/12 overflow-x-hidden rounded-xl font-main justify-center items-center" style={{margin: "0 auto"}}>    
        <main className="w-full h-screen bg-inverse rounded-xl mb-5"> 
          <div className='w-full p-12'>
            <img 
                src={logo} 
                alt='logo'
                className='w-36 h-36'
                style={{margin: "0 auto"}}  
            /> 
              
            <h1 className='text-center font-bold text-lg pt-3'>WELCOME BACK</h1>
          </div>

          <form style={{textAlign: "center"}}>
              <div className="mb-3">
                  <input 
                  id="inputEmail" 
                  type="text" 
                  placeholder="Enter your Mobile Number or Email" 
                  required="" autofocus="" 
                  className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md"
                  value={email}
                  onChange = {(e) => SetEmail(e.target.value)} />

              </div>
              <div class="mb-3">
                  <input 
                  id="inputPassword" 
                  type="password" 
                  placeholder="Enter your 4 Digit Pin or your Password"
                  required="" 
                  className="focus:ring-disable focus:border-sub w-9/12 h-full mt-2 p-3 border bg-inverse text-secondary sm:text-sm rounded-md"
                  value ={password}
                  onChange = {(e) => SetPassword(e.target.value)} />
              </div>
              
              <p>Are you a 
                  <a href="#" className="font-italic text-secondary italic no-underline hover:text-sub"> Seller?</a>
              </p>
      
              <button 
                type="submit" 
                onClick={submitLogin} 
                className="mt-8 sm:w-9/12 inline-flex justify-center rounded-lg p-3 bg-neutral text-primary font-medium hover:bg-secondary"
              > 
                Sign in
              </button>
          
              <div className="text-center d-flex justify-content-between my-4">
                <p>Dont Have an account Yet?
                  <a href="#" className="italic text-secondary mx-1 hover:text-sub"> Register Now</a>
                </p>
              </div>
                
          </form>
        </main>          
      </section>
             
            
    )
}

export default Login;