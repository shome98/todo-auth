import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { updateUserPassword } from '../../slices/authSlice'
import toast from 'react-hot-toast'

const Profile = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const { user} = auth;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const status = await dispatch(updateUserPassword({ oldPassword, newPassword }));
        setNewPassword("");
        setOldPassword("");
        if (status.meta.requestStatus === "rejected") {
            toast.error("Could not update the passsword!!!");
            return;
        }
        if (status.meta.requestStatus === "fulfilled") {
            toast.success("Successfully updated the password!!!");
            return;
        }
    }
  return (
      <>
          {user && (<><h1>{user.username}</h1>
              <h1>{user.email}</h1>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="" id="" placeholder='old password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                  <input type="text" name="" id="" placeholder='old password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <button type="submit">submit it</button>
              </form>      
          </>)
          }
      </>
  )
}

export default Profile;