import React, { useEffect, useState } from 'react';
import axios from 'axios';

// http://127.0.0.1:8000/product/store/zero/

export default function Store() {

  const [products,SetProducts] = useState([])
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/product/store/zero/').
    then(res=>{
      // console.log(res)
      SetProducts(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  })





  return (
      <section className="w-11/12 overflow-x-hidden rounded-xl font-main justify-center" style={{margin: "0 auto"}}>
        <main className="bg-inverse">
          <div className="w-full h-80 bg-secondary">
              <img src = 'https://pbs.twimg.com/media/EBTtPQFXUAAQMzM.jpg' alt="Fantech Cover"
                  className="w-full h-full object-cover"
              />
          </div>
          <div className="absolute w-3/5 flex justify-evenly items-end top-64 overflow-x-hidden">
              <div>Contact: 977 9845247956</div>
              <img src = 'https://www.pcbuildersjo.com/sites/default/files/inline-images/fantech_29.jpg' alt="fantech"
                  className="w-48 h-48 rounded-xl border-solid border-4 border-primary object-cover" />
              <div className="cursor-pointer hover:text-secondary">Pin location on map</div>
          </div>
          
          <div className="mt-12">
              <div className="text-black max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {products.map((product) => (
                  <a key={product.id} href={product.slug} className="group">
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img
                          src={product.coverImage}
                          alt={product.coverImage}
                          className="w-full h-full object-center object-cover rounded-xl group-hover:opacity-75"
                      />
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="mt-4 text-sm text-secondary truncate">{product.title}</h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                        </div>
                        <div className="flex">
                        <div className="mt-4 mx-1 rounded bg-disable w-7 h-7 text-center p-1 text-inverse cursor-pointer hover:bg-neutral">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="mt-4 mx-1 rounded bg-disable w-7 h-7 text-center p-1 text-inverse cursor-pointer hover:bg-neutral">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div> 
                        </div>
                      </div>
                  </a>
                  ))}
              </div> 
              </div>
          </div>
        </main>
      </section>
      
  )
}