import React from 'react'
import logo from '../assets/doge.png'

export interface NavProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Nav: React.FC<NavProps> = ({ onClick }) => {
  return (
    <div className="bg-white fixed w-full top-0 left-0 z-10 flex items-center justify-between shadow-sm py-3 px-6 nav">
      <div className="flex items-center">
        <img src={logo} alt="School Chat" className="h-12 w-12" />
        <h1 className="ml-3 text-3xl font-semibold">School Chat</h1>
      </div>
      <button
        type="button"
        className="px-6 py-3 text-white bg-blue font-medium rounded-md shadow-md hover:bg-blue-dark disabled:opacity-50 focus:outline-none"
        onClick={onClick}
      >
        Logout
      </button>
    </div>
  )
}
