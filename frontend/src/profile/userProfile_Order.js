const orders = [
    {
        id: 1,
        name: "GM-80",
        quantity: "1",
        orderDate: "2nd November",
        deliveredDate: "",
        status: "Paid, not delivered yet",
        alt: "Gaming Mouse 80",
        imgSrc: "https://images.unsplash.com/photo-1593108408993-58ee9c7825c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
]

const wishes = [
    {
        id: 1,
        name: "Nezuko Cosplay Costume",
        alt: "Pink Kimono",
        imgSrc: "https://i5.walmartimages.com/asr/0803a872-14c9-4510-8736-42a514586ab1.de6fb479102a8729a1e73165ebca8ca8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
    },
    {
        id: 2,
        name: "Asus Zephyrus",
        alt: "Asus Zephyrus Image",
        imgSrc: "https://www.slashgear.com/wp-content/uploads/2020/04/asus-zephyrus-duo-15-4.jpg"
    },
    {
        id: 3,
        name: "Mitsubishi Lancer Evolution X",
        alt: "Mitsubishi Car",
        imgSrc: "https://cdn.motor1.com/images/mgl/6EEZG/s1/2015-6098442015-mitsubishi-lancer-evolution-final-edition1.jpg"
    },
]

const UserOrder = () => {
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
            
            {/* Contents */}
            <div className="w-full my-24 px-10 flex justify-between">
                {/* Orders */}
                <div className="w-5/12">
                    <h1 className="text-xl font-medium my-5">My Orders</h1>

                    {orders.map((order) => (
                        <div className="flex w-full">
                            <img src={order.imgSrc} alt={order.alt} className="rounded-xl h-32 w-32"></img>
                            <div className="flex-column text-sm px-3 mt-1">
                                <p className="font-medium text-lg">{order.name}</p>
                                <p className="font-light">Quantity x{order.quantity}</p>
                                <p className="font-medium">Ordered on: <span className="font-light">{order.orderDate}</span></p>
                                <p className="font-medium">Delivered on: <span className="font-light">{order.deliveredDate}</span></p>
                                <p className="font-medium">{order.status}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Wishlist */}
                <div className="w-5/12 rounded-xl bg-primary">
                    <h1 className="text-xl font-medium mx-8 mt-5 text-neutral">My Wishlist</h1>
                    <div className="my-8 grid justify-items-center grid-cols-2 gap-y-8 ">
                        {wishes.map((wish) => (
                            <div className="flex-column w-28">
                                <img src={wish.imgSrc} alt={wish.alt} className="h-28 w-32 rounded-xl object-cover" />
                                <h3 className="truncate text-neutral">{wish.name}</h3>
                                <p className="text-xs text-disable">Remove</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
      </main>
    )
}

export default UserOrder;