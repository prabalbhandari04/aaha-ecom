import React from 'react'
import Nepal from '../assets/GIF/napal-flag-gif.gif';

const Layout = () => {
    
    const Lists = [
        "Anamnagar",
        "Ason",
        "Basantapur",
        "Bagbazar",
        "Baneshwor",
        "Chabahil",
        "Chettrapati",
        "Dillibazar",
        "Gosaikunda",
        "Hattiban",
        "Hattishar",
        "Kalimati",
        "Kalanki",
        "Makhan",
        "Naradevi",
        "New Road",
        "Putalisadak",
        "Thamel",
    ]
    const LocationLists = Lists.map((List)=>{
        return <li className="mx-0 px-0 text-neutral font-main">{List}</li>;
    });

    return (
        <div className="bg-inverse flex mx-5">
            {/* Left logo and locations */}
            <div className="my-5 w-1/5 h-full">
                <div className="flex items-end space-x-10">
                    <img src={Nepal} alt="Nepal Flag" className="w-8 h-10 object-fill" />
                    <h1 className="text-secondary text-3xl font-secondary">Aaha</h1>
                </div>

                {/* Locations */}
                <div className="pt-12">
                    <h1 className="text-secondary text-lg font-main">Search by Location</h1>
                    <ul className="list-none pt-5">
                        {LocationLists}
                    </ul>
                </div>
            </div>

            {/* Main body */}
            <div className="w-3/5 min-h-screen rounded-lg bg-primary">
                {/* SearchBar */}
                <div className="m-5">
                    <div className="h-12 relative rounded-md shadow-sm flex">
                        <div className="absolute inset-y-0 left:0 flex items-center">
                            <label htmlFor="categories" className="sr-only">
                                categories
                            </label>
                            <select
                                id="categories"
                                name="categories"
                                className="focus:ring-disable focus:border-sub h-full py-0 pl-2 pr-7 border-transparent bg-neutral text-primary text-center sm:text-sm rounded-md"
                            >
                                <option >All</option>
                                <option>This</option>
                                <option>That</option>
                            </select>
                        </div>
                        
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="focus:border-0 focus:border-transparent h-12 block w-full text-center px-12 sm:text-sm rounded-md"
                            placeholder="Search Here......."
                        />
                    </div>
                </div>
            </div>
            
            {/* Right Featured */}
            <div className="w-1/5 h-full"></div>
        </div>
    )
}

export default Layout
