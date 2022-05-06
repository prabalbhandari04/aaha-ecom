import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Feed = () => {
    const [stores,SetStore] = useState([])
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/product/')
    .then(res=>{
      // console.log(res)
      SetStore(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  })

    return (
        <div className="w-full mx-8 my-10">
            {stores.map((store) => (
                <a key={store.id} href={store.slug}>
                    {store.items.map((sub)=>(
                    <div className="w-full h-72 bg-neutral rounded-xl flex">
                        <img
                            src={store.avatar}
                            alt={store.avatar}
                            className="w-2/6 h-full object-center object-contain rounded-xl bg-secondary group-hover:opacity-75"
                        />
                        <div className="flex-col w-4/6">
                            <div className="w-11/12 flex justify-between my-2 mx-5">
                                {/* Title and Location */}
                                <div>
                                    <h1 className="mt-4 text-xl text-primary truncate">{store.storeName}</h1>
                                    <p className=" text-sm font-light text-disable">Backend ma store location chaina</p>
                                </div>

                                {/* Rating
                                <div class="flex mt-4">
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="yellow"/>
                                    <FontAwesomeIcon icon={faStar} color="primary"/>
                                </div> */}
                            </div>

                            {/* Featured */}
                            <h1 className="m-5 text-2xl text-primary">Featured Products</h1>

                            <div className="flex mx-5">
                                <div className="rounded-xl w-28 h-28 bg-primary">
                                   {/* <img src= "http://localhost:8000/{sub.coverImage}" alt={sub.coverImage}/> */}
                                   <img src= {"http://localhost:8000"+sub.coverImage} alt={sub.coverImage}/>                                
                                </div>
                            </div> 
                        </div>
                        
                    </div>  
                    ))}
                </a>
            ))}
        </div>

    )
}

export default Feed;