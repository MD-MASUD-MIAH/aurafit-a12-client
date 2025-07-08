

import { Navigate, useLocation } from 'react-router';

import useAuth from '../hooks/useAuth';
import Loader from '../shared/Loader';

const  PriveteRoute = ({children}) => {

    const {user,loading} = useAuth()

    const location = useLocation()


    if(loading){

        return <Loader></Loader>
    }

    if(user && user.email){

        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
   
};

export default  PriveteRoute;