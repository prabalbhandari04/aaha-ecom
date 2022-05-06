import InputFields from "../modal/inputForModal";

const UserEdit = () => {
    return (
        <main className="overflow-x-hidden bg-inverse rounded-xl font-main">
            <div className="w-screen h-80 bg-secondary">
                <img src = 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' alt="User Cover"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute w-3/5 flex px-12 justify-between items-end top-64 overflow-x-hidden">
                <div className="italic font-medium  ">Orders and Wishlists</div>
                <img src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' alt="User"
                    className="w-48 h-48 rounded-xl border-solid border-4 border-primary object-cover" />
                <div className="cursor-pointer hover:text-secondary italic text-neutral">Edit Personal Information</div>
            </div>
            
            {/* Form */}
            <div className="w-full mt-24 px-12">
                <h1 className="text-xl font-medium">Personal Information</h1>
                <div className="h-8"></div>
                <InputFields label= "Full Name" placeholder="Mani Jha" styling={{visibility: "visible"}}/>
                <InputFields label= "Address" placeholder="Dillibazar, Kathmandu" styling={{visibility: "visible"}}/>
                <InputFields label= "Email" placeholder="fakeuser@gmail.com" styling={{visibility: "hidden"}}/>
                <InputFields label= "Contact" placeholder="9841XXXXXX" styling={{visibility: "visible"}}/>
                <InputFields label= "Secondary Contact" placeholder="9808XXXXXX" styling={{visibility: "visible"}}/>
                
                {/* Security */}
                <div className="h-8"></div>
                <h1 className="text-xl font-medium">Security</h1>
                <InputFields label= "Change Password" styling={{visibility: "visible"}}/>
                <div className="h-8"></div>
            </div>
      </main>
    )
}

export default UserEdit;