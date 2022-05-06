import Field from "../modal/inputForEdit";

const Seller = () => {
    return (
        <section className="w-11/12 overflow-x-hidden rounded-xl font-main justify-center" style={{margin: "0 auto"}}>
            <main className="bg-inverse">
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
                <div className="w-full mt-24 px-12">
                    <h1 className="text-xl font-medium">Personal Information</h1>
                    <div className="h-8"></div>
                    <Field label= "Brand Name" placeholder="Fantech Nepal" styling={{visibility: "visible"}}/>
                    <Field label= "Address" placeholder="Dillibazar, Kathmandu" styling={{visibility: "visible"}}/>
                    <Field label= "Email" placeholder="fantechfakemail@gmail.com" styling={{visibility: "hidden"}}/>
                    <Field label= "Contact" placeholder="9855XXXXXX" styling={{visibility: "visible"}}/>
                    <Field label= "Secondary Contact" placeholder="-" styling={{visibility: "visible"}}/>
                    
                    {/* Security */}
                    <div className="h-8"></div>
                    <h1 className="text-xl font-medium">Security</h1>
                    <Field label= "Change Password" placeholder="Password" styling={{visibility: "visible"}}/>
                    <div className="h-8"></div>
                </div>
            </main>
        </section>
        
    )
}

export default Seller;