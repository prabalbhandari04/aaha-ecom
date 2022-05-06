// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputProducts from "../modal/inputFieldProduct";
import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
const AddProduct = () => {
    const [name,SetName] = useState("")
    const [price,SetPrice] = useState("")

    console.log(name)
    console.log(price)

    const submit = async () => {
        axios.post("http://127.0.0.1:8000/product/store/zero/",name,price)
      }

    return (
        <section className="w-11/12 overflow-x-hidden rounded-xl font-main justify-center" style={{margin: "0 auto"}}>
            <main className="bg-inverse rounded-xl mb-5">
                <div className="w-full h-80 bg-secondary">
                    <img src = 'https://pbs.twimg.com/media/EBTtPQFXUAAQMzM.jpg' alt="Fantech Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute w-3/5 flex justify-evenly items-end top-64 overflow-x-hidden">
                    <div className="italic">Edit Products</div>
                    <img src = 'https://www.pcbuildersjo.com/sites/default/files/inline-images/fantech_29.jpg' alt="fantech"
                        className="w-48 h-48 rounded-xl border-solid border-4 border-primary object-cover" />
                    <div className="cursor-pointer hover:text-secondary italic text-neutral font-medium">Edit Personal Information</div>
                </div>
                
                {/* Form */}
                <div className="w-full mt-24 px-12 pb-8">
                    <h1 className="text-xl font-medium">Add Products</h1>
                    <div className="h-8"></div>
                    <InputProducts type="text" name="product" id="product" placeholder="Product Name"  value={name}
                     onChange = {(e) => SetName(e.target.value)} />

                    <textarea className="resize-y mt-8 focus:ring-neutral focus:border-neutral bg-primary text-secondary block w-full p-3 sm:text-xs border-neutral rounded" placeholder="Description"></textarea>
                    <InputProducts type="text" name="price" id="price" placeholder="Price" value={price}
                     onChange = {(e) => SetPrice(e.target.value)} />
                    <select
                                id="categories"
                                name="categories"
                                className="focus:ring-disable focus:border-sub w-full h-full mt-8 p-3 border-transparent bg-primary text-secondary sm:text-sm rounded-md"
                            >
                                <option >Categories</option>
                                <option>This</option>
                                <option>That</option>
                    </select>
                    <InputProducts type="text" name="tags" id="tags" placeholder="Tags" />
                    <select
                                id="stock"
                                name="stock"
                                className="focus:ring-disable focus:border-sub w-full h-full mt-8 p-3 border-transparent bg-primary text-secondary sm:text-sm rounded-md"
                            >
                                <option >Stock</option>
                                <option>Available</option>
                                <option>Sold Out</option>
                    </select>
                    {/* <div className="w-full bg-primary rounded-lg flex justify-center p-24 mt-8 items-center">
                        <FontAwesomeIcon icon={faCamera} color="secondary" size="2x"/>
                        <p className="px-3 text-sm">Add Photos to best show your product (Max Limit 5)</p>
                    </div> */}

                    {/* Button */}
                    <button
                        type="button"
                        onClick={submit}
                        className="mt-8 sm:w-full inline-flex justify-center rounded-lg p-3 bg-neutral text-primary font-medium"
                    >
                        Save
                    </button>
                </div>
            </main>
        </section>
        
    )
}

export default AddProduct;