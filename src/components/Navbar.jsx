import React from 'react'
import { FaPlus } from 'react-icons/fa'
import logo from '../assets/app_logo.png'
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import { HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <div className="py-2 sm:px-10 px-2 flex justify-between items-center w-full">
            <div className="flex-shrink-0">
                <img src={logo} alt="logo-image" className="w-32 sm:w-40 md:w-42" />
            </div>

            <div className=" flex justify-end">
                <button
                    onClick={() => dispatch(openModal())}
                    className="hidden sm:flex hover:shadow-lg shadow-[#adadad] w-full max-w-xs cursor-pointer text-sm  gap-2 items-center justify-center bg-[#8c20d4] p-3 text-white rounded-xl "
                >
                    <FaPlus />
                    <span>New Product</span>
                </button>
                <HiBars3BottomRight size={20} className='sm:hidden flex' />
            </div>
        </div>

    )
}

export default Navbar