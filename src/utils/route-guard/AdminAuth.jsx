/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// project imports



// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes

 */
const AdminAuth = () => {
    const { getaccessToken, user ,isAdmin,loading} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
     const token=getaccessToken();
    // useEffect(() => {
    //     if (location.pathname) {
    //         dispatch(activeItem(location.pathname.split('/')[1]));
    //     }
    //     if ((location.pathname.includes('users') || location.pathname.includes('bulk-upload')) && user.type !== 'admin') {
    //         navigate('/facilities', { replace: true });
    //     }
    // }, [location.pathname]);
    // console.log(token);

    // useEffect(() => {
     
    //     if (!token) {
    //         navigate('signin', { replace: true });
    //     }
        
           
     
    // }, [token, navigate]);
      // console.log(isAdmin)
    return  (<>
     {
       !loading && 
       
       !isAdmin ?
       <Navigate to ='unauthorized' replace />
       :
       <Outlet/>
     }
    </>
    )
    // console.log(isAdmin)
    // return (<Outlet/>)
    //  (<Outlet/>);
};



export default AdminAuth;
