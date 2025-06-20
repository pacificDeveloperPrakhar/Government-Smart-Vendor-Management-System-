import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate ,Outlet} from 'react-router-dom';
import RegisterStudent  from '../../components/client/auth/RegisterProfile';
export default function ProfileRouted({children,roles}) {
    const user=useSelector(state=>state.user);
    
    const isVerified=user?.verification_details?.isVerified
    const isAdmin=user?.role?.includes("admin");
    const isEmployer=user?.role?.includes("human_resource");
    if(!isVerified)
        return <RegisterStudent/>
    if(roles.includes('admin')&&isAdmin)
        return <Outlet/>
    else if(roles.includes('employer')&&isEmployer)
        return <Outlet/>
    return <Outlet/>
    ;
}
