import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import InputFields from './inputForModal'

export default function EditName() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-sub bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-inverse rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-xs">
              <div className="bg-neutral px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div>
                        <h1 className="text-xl mb-5 text-primary">Edit Name</h1>
                        
                        {/* Textfield */}
                        <InputFields label="First Name" type="text" name="fname" placeholder="Your first name goes here.."/>
                        <InputFields label="Last Name" type="text" name="lname" placeholder="Your last name goes here.."/>
                        
                        {/* Button */}
                        <button
                            type="button"
                            className="sm:w-full inline-flex justify-center rounded px-4 py-2 mb-4 bg-primary text-base font-medium text-neutral hover:bg-inverse sm:mt-8 sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Save
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}