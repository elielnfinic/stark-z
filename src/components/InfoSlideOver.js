import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function InfoSlideOver(props) {
    //   const [open, setOpen] = useState(true)

    return (
        <Transition.Root show={props.show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.fn_show}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    About Stark-Z
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={() => props.fn_show(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className='py-2'>
                                                <div className='text-xl py-2'>What is Ztransform?</div>
                                                <div>Z-transform is a mathematical transformation used in digital signal processing (DSP) to analyze and manipulate discrete-time signals. It transforms a discrete-time signal, which is a sequence of numbers, into a complex function of a complex variable called the Z-transform variable. The Z-transform is analogous to the Laplace transform in continuous-time signal processing and is used to solve linear difference equations, study the stability of discrete-time systems, and analyze digital filters. Z-transforms are widely used in digital signal processing applications such as image processing, speech recognition, and control systems.</div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='text-xl py-2'>Smart contract on Starknet</div>
                                                <div>
                                                    <div className='text-md underline'><a href={`https://testnet.starkscan.co/contract/${props.contract}`}>View on Starkscan</a></div>
                                                </div>
                                                <div>
                                                    <div className='text-md underline'><a href={`https://goerli.voyager.online/tx/${props.contract}`}>View on Voyager</a></div>
                                                    
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='text-xl py-2'>Why the result is different from classic Ztransform?</div>
                                                <div>The Z-transform is a well-known mathematical transformation that is widely used in digital signal processing. However, when running programs on Starknet, which uses the Cairo language, floating-point numbers are not supported. As a result, the number grows drastically and becomes too large to be processed. To overcome this issue, the program uses a different approach where instead of dividing by the power of e, it multiplies by that value to have different values. This method allows the program to observe the behavior of these numbers in Starknet conditions, even though the resulting values are not similar to the Z-transform of the input. Despite this difference, the program is still able to analyze and manipulate discrete-time signals in a meaningful way.</div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='text-xl py-2'>Why test Ztransform for ZKP?</div>
                                                <div>
                                                    The Z transform presents many advantages over the Fourier transform, including the ability to analyze signals with non-periodic components, the ability to analyze signals with non-integer frequencies, and the ability to analyze signals with non-integer sampling rates. However, the Z transform is not widely used in practice because it is difficult to implement in hardware. The Z transform is a well-known mathematical transformation that is widely used in digital signal processing. However, when running programs on Starknet, which uses the Cairo language, floating-point numbers are not supported. As a result, the number grows drastically and becomes too large to be processed. To overcome this issue, the program uses a different approach where instead of dividing by the power of e, it multiplies by that value to have different values. This method allows the program to observe the behavior of these numbers in Starknet conditions, even though the resulting values are not similar to the Z-transform of the input. Despite this difference, the program is still able to analyze and manipulate discrete-time signals in a meaningful way.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
