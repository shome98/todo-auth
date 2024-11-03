import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileButton = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/profile")} className="p-2 ml-auto mr-14 rounded-md hover:bg-red-700 text-white">
          Profile
    </button>
  )
}

export default ProfileButton