// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from './pages/Home/home';
// import Store from './pages/Store/productsPage'
// import Login from './pages/login/Login'
// import Register from './pages/register/register'
// import Product from './pages/ProductDetail/productdetail'
// import Cart from './pages/Cart/checkoutCart'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// ReactDOM.render(
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/store" element={<Store />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/product" element={<Product />} />
//       <Route path="/cart" element={<Cart />} />
//     </Routes>
//   </Router>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
