// import * as React from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import '../login-template/login.css'
// import {Container,Col,Row} from 'react-bootstrap'
// import {
//     Button,
//     Form,
//     FormGroup,
//     Input,
//     Label
//   } from 'reactstrap';




// function SignIn(){
  
//   const [email,SetEmail] = useState("")
//   const [password,SetPassword] = useState("")

//   const submitLogin = async () => {
//     console.log("hey there")
//     let formField = new FormData()
//     formField.append('email',email)
//     formField.append('password',password)

//     await axios({
//       method: 'post',
//       url:'http://localhost:5000/authenticate',
//       data: formField
//     }).then(response=>{
//       console.log(response.data);
//     })
// }
//     return(
//       <div className="maincontainer">
//         <div class="container-fluid">
//           <div class="row no-gutter">
             
//             <div class="col-xl-3 d-none d-md-flex"><h1></h1></div>
              
//               <div class="col-md-6 bg-light">
//                   <div class="col-md-6 col-xs-6">
//                 <img  src="https://image.shutterstock.com/image-vector/h-letter-logo-vector-design-600w-1940187814.jpg" class="img-responsive" alt="Responsive image"></img>
//                 </div>
//                   <div class="login d-flex align-items-center py-5">
                  
//                       <div class="container">
//                           <div class="row">
//                               <div class="col-lg-10 col-xl-7 mx-auto">
                        
//                                   <form>
//                                       <div class="mb-3">
//                                           <input 
//                                           id="inputEmail" 
//                                           type="email" 
//                                           type="phone" 
//                                           placeholder="Enter your Mobile Number or Email" 
//                                           required="" autofocus="" 
//                                           class="form-control rounded-pill border-0 shadow-sm px-4"
//                                           value={email}
//                                           onChange = {(e) => SetEmail(e.target.value)} />

//                                       </div>
//                                       <div class="mb-3">
//                                           <input 
//                                           id="inputPassword" 
//                                           type="password" 
//                                           placeholder="Enter your 4 Digit Pin or your Password"
//                                            required="" 
//                                            class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
//                                            value ={password}
//                                           onChange = {(e) => SetPassword(e.target.value)} />
//                                       </div>
//                                       <p>Are you a <a href="#" class="font-italic text-primary"> 
//                                               <u>Seller?</u></a></p>
//                                       <div class="d-grid gap-2 mt-2">
//                                       <button type="submit" onClick={submitLogin} class="btn btn-sm text-light bg-dark btn-block text-uppercase rounded-pill shadow-sm">Sign in</button>
//                                       </div>
//                                       <div class="text-center d-flex justify-content-between mt-4"><p>Dont Have an account Yet?<a href="#" class="font-italic text-primary"> 
//                                               <u> Register Now</u></a></p></div>
                                        
//                                   </form>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//     </div>
//     )
// }

// export default SignIn;