/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

const products = [
  {
    id: 1,
    name: 'Gaming Mouse GM-5319 Prime Edition',
    href: '#',
    seller: 'Fantech',
    price: 'Rs. 1100',
    quantity: 1,
    imageSrc: 'https://cdn.mos.cms.futurecdn.net/doSnYsJheC6KZMLhaJpxmd.jpg',
    imageAlt: 'Exclusive edition gaming mouse by fantech',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    seller: 'Fashionble',
    price: 'Rs. 3200',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export default function Cart() {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-sub bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md bg-neutral">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-primary">Shopping cart</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-primary"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6">
                          {products.map((product) => (
                            <li key={product.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-sub">
                                    <h3>
                                      <a href={product.href}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-disable">{product.seller}</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <p className="text-sub">Qty {product.quantity}</p>

                                  <div className="flex">
                                    <button type="button" className="font-medium text-disable hover:text-primary">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-primary">
                      <p>Subtotal</p>
                      <p>Rs. 4400</p>
                    </div>
                    <p className="mt-0.5 text-sm text-sub">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-secondary bg-sub hover:bg-primary"
                      >
                        Proceed to Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-disable">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="text-sub font-medium hover:text-primary"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}