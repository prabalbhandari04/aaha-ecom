/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
  import axios from 'axios';
  import { useState } from 'react';
  import logo from '../../assets/Images/finalLogo.png';


function Register(){  
    const [email,SetEmail] = useState("")
    const [password,SetPassword] = useState("")
    console.log(email)
    console.log(password)

    const submitRegister = async () => {
        axios.post(`http://127.0.0.1:8000/user/register/`, {
            email,
            password
        })
    }
    return(
        <section className="w-11/12 overflow-x-hidden rounded-xl font-main justify-center items-center" style={{margin: "0 auto"}}>    
            <main className="w-full bg-inverse rounded-xl mb-5"> 
                <div className='w-full p-12'>
                    <img 
                        src={logo} 
                        alt='logo'
                        className='w-36 h-36'
                        style={{margin: "0 auto"}}  
                    /> 
                    
                    <h1 className='text-center font-bold text-lg pt-3'>CREATE AN ACCOUNT</h1>
                </div>
                        
                <form style={{textAlign: "center"}}>
                    <div className="mb-3">
                        <input 
                            id="inputfirst" 
                            type="text" 
                            placeholder="First Name" 
                            required="" 
                            autofocus="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md" />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputlast" 
                            type="text" 
                            placeholder="Last Name" 
                            required="" 
                            autofocus="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md" />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputEmail" 
                            type="email" 
                            placeholder="Email"  
                            value={email}
                            onChange = {(e) => SetEmail(e.target.value)} 
                            required="" 
                            autofocus="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md" />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputPhone" 
                            type="phone" 
                            placeholder="Phone Number" 
                            required="" 
                            autofocus="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md" />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputAddress" 
                            type="text" 
                            placeholder="Address" 
                            required="" 
                            autofocus="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md" />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputdob" 
                            type="date" 
                            placeholder="Date Of Birth" 
                            required="" 
                            autofocus="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md" />
                    </div>
                    <div className="mb-3">
                        <select
                            id="gender"
                            name="gender"
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md"
                        >
                            <option >Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputPassword" 
                            type="password" 
                            value={password}
                            onChange = {(e) => SetPassword(e.target.value)} 
                            placeholder="Enter your 4 Digit Pin/Password" 
                            required="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md text-primary" />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="inputPassword" 
                            type="password" 
                            placeholder="Confirm your 4 Digit Pin/Password" 
                            required="" 
                            className="focus:ring-disable focus:border-sub w-9/12 h-full mt-5 p-3 border bg-inverse text-secondary sm:text-sm rounded-md text-primary" />
                    </div>

                    {/* Account Type */}
                    <div className="mb-3 px-2" >
                        <p className="font-bold text-xl mt-8 mb-5">Account Type</p>

                        <div className='flex justify-evenly'>
                            <div>
                                <input type="checkbox" id="accountType" name="AccountType" value="Account Type"/>
                                <label for="accountType" className='pl-2'>Buyer</label>
                            </div>
                            
                            <div>
                                <input type="checkbox" id="accountType1" name="AccountType" value="Account Type"/>
                                <label for="accountType1" className='pl-2'>Retailer</label>
                            </div>

                            <div>    
                                <input type="checkbox" id="accountType2" name="AccountType" value="Account Type"/>
                                <label for="accountType2" className='pl-2'>Distributor</label>
                            </div>

                            <div>
                                <input type="checkbox" id="accountType3" name="AccountType" value="Account Type"/>
                                <label for="accountType3" className='pl-2'>Manufacturer</label>
                            </div>

                        </div>
                    </div>

                    <button 
                        type="submit" 
                        onClick={submitRegister} 
                        className="mt-8 sm:w-9/12 inline-flex justify-center rounded-lg p-3 bg-neutral text-primary font-medium hover:bg-secondary">Sign in</button>
    
                    <div className="text-center justify-between mt-4">
                        <p>Already have an account?
                            <a href="#" className="italic text-secondary hover:text-disable">Login</a>
                        </p>
                    </div>
                    
                </form>
            </main>          
        </section>
                              
    )
}

export default Register;