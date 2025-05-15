import React from 'react'
import { FaPlus } from 'react-icons/fa'
import logo from '../assets/app_logo.png'
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import { HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-2 px-2 sm:px-10 flex justify-between items-center w-full">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo-image" className="w-32 sm:w-40 md:w-42" />
          </div>
      
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => dispatch(openModal())}
              className="hidden sm:flex hover:shadow-lg shadow-[#adadad] w-full max-w-xs cursor-pointer text-sm gap-2 items-center justify-center bg-[#8c20d4] p-3 text-white rounded-xl"
            >
              <FaPlus />
              <span>New Product</span>
            </button>
      
            <HiBars3BottomRight size={24} className="sm:hidden text-gray-700" />
          </div>
        </div>
      );
      
}

export default Navbar