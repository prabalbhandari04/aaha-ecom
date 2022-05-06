import * as React from 'react';
import {Container,Col,Row} from 'react-bootstrap'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
  import axios from 'axios';
  import { useState } from 'react';


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
      <div className="maincontainer">
        <div class="container-fluid">
          <div class="row no-gutter">
             
            <div class="col-xl-3 d-none d-md-flex"><h1></h1></div>
              
              <div class="col-md-6 bg-light">
                  <div class="col-md-6 col-xs-6">
                </div>
                  <div class="login d-flex align-items-center py-5">
                  
                      <div class="container">
                          <div class="row">
                              <div class="col-lg-10 col-xl-7 mx-auto">
                        
                                  <form>
                                      <div class="mb-3">
                                          <input id="inputfirst" type="text" placeholder="First Name" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputlast" type="text" placeholder="Last Name" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputEmail" type="email" placeholder="Email"  value={email}
                                          onChange = {(e) => SetEmail(e.target.value)} required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputPhone" type="phone" placeholder="Phone Number" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputAddress" type="text" placeholder="Address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputdob" type="date" placeholder="Date Of Birth" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputGender" type="text" placeholder="Gender" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputPassword" type="password" value={password}
                                          onChange = {(e) => SetPassword(e.target.value)} placeholder="Enter your 4 Digit Pin/Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                      </div>
                                      <div class="mb-3">
                                          <input id="inputPassword" type="password" placeholder="Confirm your 4 Digit Pin/Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                      </div>
                                      <div class="mb-3 px-2" >
                                          <p class="font-weight-bold">Account Type</p>
                                        <input type="checkbox" id="accountType" name="AccountType" value="Account Type"/>
                                        <label for="accountType">Buyer</label>
                                        <input type="checkbox" id="accountType1" name="AccountType" value="Account Type"/>
                                        <label for="accountType1">Retailer</label>
                                        <input type="checkbox" id="accountType2" name="AccountType" value="Account Type"/>
                                        <label for="accountType2">Distributor</label>
                                        <input type="checkbox" id="accountType3" name="AccountType" value="Account Type"/>
                                        <label for="accountType3">Manufacturer</label>

                                    </div>

                                      <p>Are you a <a href="#" class="font-italic text-primary"> 
                                              <u>Seller?</u></a></p>
                                      <div class="d-grid gap-2 mt-2">
                                      <button type="submit" onClick={submitRegister} class="btn btn-sm text-light bg-dark btn-block text-uppercase rounded-pill shadow-sm">Sign in</button>
                                      </div>
                                      <div class="text-center d-flex justify-content-between mt-4"><p>Dont Have an account Yet?<a href="#" class="font-italic text-primary"> 
                                              <u> Register Now</u></a></p></div>
                                        
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    )
}

export default Register;