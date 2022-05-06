/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CartFull(){  
    const [products,SetProducts] = useState([])

    
    const accesstoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDE0NTc5OTUsImlhdCI6MTY0MTAyNTk5NX0.H_N9VwEOcO5AYtPo65xBCnucCjPHi6TLTT2BeWASLyU';
    const authAxios = axios.create({
        headers:{
            Authorization: `Bearer ${accesstoken}`,
        },
    });

    // useEffect(()=>{
    //     axios.get('http://127.0.0.1:8000/order/getOrder/4').    
    //     then(res=>{
    //     //   console.log(res)
    //       SetProducts(res.data.detail)
    //     })
    //     .catch(err =>{
    //       console.log(err)
    //     })




  useEffect(()=>{
    authAxios.get('http://127.0.0.1:8000/order/getOrder/4').    
    then(res=>{
    //   console.log(res)
      SetProducts(res.data.detail)
    })
    .catch(err =>{
      console.log(err)
    })
})
    return (
        <>
        <section className="w-11/12 h-screen rounded-xl bg-inverse flex flex-wrap" style={{margin: "0 auto"}}>
            <div className="xl:w-7/12 rounded-l-lg sm:w-screen bg-inverse">
                {/* Products */}
                <div className="m-12">
                    {products.map((product) => (
                        <div className="flow-root">
                            <ul className="-my-6">
                            <h1 className="m-12 text-xl font-main font-medium">Shopping Cart | BillNo:{product.billNo}</h1>
                                {product.items.map((sub)=>(
                                    <li key={product.id} className="py-6 flex">
                                        <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                            <img
                                                src={sub.coverImage_url}
                                                className="w-full h-full object-center object-cover" />
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-secondary">
                                                    <h3>
                                                        <a href={product.identifier}>{sub.name}</a>
                                                    </h3>
                                                    
                                                    <p className="ml-4">{sub.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-neutral">{product.seller}</p>
                                            </div>
                                            <div className="flex-1 flex items-end justify-between text-sm items-end">
                                                <div className="flex space-x-4">
                                                    <p className="text-neutral">Qty</p>
                                                    <div className="rounded bg-neutral w-7 h-7 text-center p-1 text-inverse cursor-pointer">
                                                        -
                                                    </div>
                                                    <div>
                                                        {sub.quantity}
                                                    </div>
                                                    <div className="rounded bg-neutral w-7 h-7 text-center p-1 text-inverse cursor-pointer">
                                                        +
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <button type="button" className="font-light text-sub hover:text-secondary">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Total */}
                            <div className="w-1/2 m-12 absolute left-0 bottom-0 flex justify-between items-end">
                                <button className="rounded-xl w-36 h-12 bg-neutral text-center text-primary">Back<a href='http://localhost:3000/'></a></button>
                                <div>
                                    <h3 className="text-neutral text-lg font-thin">Sub-Total: <span className="px-4 font-medium">{product.amount}</span></h3>
                                    <h3 className="text-neutral text-lg font-thin">Tax: <span className="px-4 font-medium">{product.taxAmount}</span></h3>
                                    <h3 className="text-neutral text-lg font-thin">Shipping: <span className="px-4 font-medium">{product.shipAmount}</span></h3>
                                    <h3 className="text-neutral text-lg font-thin">Discount: <span className="px-4 font-medium">{product.discountAmount}</span></h3>
                                    <div className="mx-6 my-3 w-24 h-1 rounded-xl bg-neutral"/>
                                    <h3 className="text-neutral text-lg text-center font-thin">Total: <span className="px-4 font-medium">{product.grandAmount}</span></h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                
            </div>

            <div className="xl:w-5/12 sm:w-screen rounded-lg bg-neutral">
                <h1 className="m-12 text-xl text-primary font-main font-medium">Billing Information</h1>
            </div>
        </section>
        </>
        
    )
}
