import React, { useState } from 'react';

const Header = () => {
    const [isOpen, open] = useState(false);

    return (
    <nav x-data="{ open: true }" className={"bg-gray-800"}>
        <div className={"max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"}>
        <div className={"relative flex items-center justify-between h-16"}>
            <div className={"absolute inset-y-0 left-0 flex items-center sm:hidden"}>
            <button onClick={() => open(!isOpen)} className={"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"}>
                <svg className={"h-6 w-6"} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={`${isOpen ? 'hidden' : 'inline-flex'}`} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"} d="M4 6h16M4 12h16M4 18h16" />
                <path className={`${isOpen ? 'inline-flex' : 'hidden'}`} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            <div className={"flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"}>
            <div className={"flex-shrink-0 text-gray-300 flex items-center"}>
                <img alt="logo" src="../../favicon.svg" className="my-0 mx-1" style={{maxWidth: '26px'}} /> <h2>Elastichain</h2>
            </div>
            <div className={"hidden sm:block sm:ml-6"}>
                <div className={"flex"}>
                    <a href="/" className={"px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"}>Trade</a>
                    <a href="/my-wallet" className={"ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"}>My Wallet</a>
                </div>
            </div>
            </div>
            <div className={"absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"}>
            <button className={"p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"}>
                <svg className={"h-6 w-6"} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </button>
            </div>
        </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className={"px-2 pt-2 pb-3"}>
            <a href="/" className={"block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"}>Trade</a>
            <a href="/" className={"mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"}>My Wallet</a>
        </div>
        </div>
  </nav>
    )
};
export default Header;