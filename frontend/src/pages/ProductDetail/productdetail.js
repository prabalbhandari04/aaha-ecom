import "tailwindcss/tailwind.css"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const [details,SetDetails] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/product/zero-keyboard/').
        then(res=>{
            console.log(res)
        // SetDetails(res.data)
        })
        .catch(err =>{
        console.log(err)
        })
    })
    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">

            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img className="w-full" alt="img of a girl posing" src={details.coverImage} />
                <img className="mt-6 w-full" alt="img of a girl posing" src={details.coverImage} />
            </div>
            <div className="md:hidden">
                    <img className="w-full" alt="img of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={details.gallery} />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={details.gallery} />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={details.gallery} />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={details.gallery} />
                </div>
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm leading-none text-gray-600">Product ID : {details.id}</p>
                    <h1
                        className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                    >  
                       {details.title}
                    </h1>
                </div>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div class="flex">
            <span class="mr-3">Nrs {details.price}/-</span>
          </div>
          <div class="flex ml-6 items-center">
            <span class="mr-3">Qty</span>
            <div class="relative">
              <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="flex ml-12 items-center">
            <span class="mr-3">In Stock</span>
          </div>
        </div>
                <button
                    className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
                >
                    Add To Cart
                </button>
                <div>
                    <p className="xl:pr-10 text-base lg:leading-tight leading-normal text-gray-600 mt-1">{details.description}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Length: 13.2 inches</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Height: 10 inches</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Depth: 5.1 inches</p>
                    <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">Rating : {details.avgRating}</p>
                </div>
                <div>
                    <div className="border-t border-b py-2 mt-1 border-gray-200">
                        <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Retailer</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"pt-1 text-base leading-normal pr-4 mt-1 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-b py-2 border-gray-200">
                        <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Manufacturer</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"pt-1 text-base leading-normal pr-4 mt-1 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                            If you have any questions on how to return your item to us, contact us.
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-b py-2 border-gray-200">
                        <div onClick={() => setShow3(!show3)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Brand</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (show3 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"pt-1 text-base leading-normal pr-4 mt-1 text-gray-600 " + (show3 ? "block" : "hidden")} id="sect">
                            If you have any questions on how to return your item to us, contact us.
                        </div>
                    </div>
                </div>
            </div>
        </div>


            // starting reviews
        
    );
};

export default Product;
