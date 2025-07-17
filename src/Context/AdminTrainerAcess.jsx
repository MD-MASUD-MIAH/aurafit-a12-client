import { Navigate, useLocation } from 'react-router'

import useRole from '../hooks/useRole'
import Loader from '../shared/Loader'

const  AdminTrainerAcess = ({ children }) => {
  const { role, isRoleLoading} = useRole()
  const location = useLocation()
  console.log(location)
  console.log('I was here, in trainer route')
  if (isRoleLoading) return <Loader></Loader>
  if (role === 'trainer' || role ==='admin') return children
  return <Navigate to='/' replace='true' />
}

export default   AdminTrainerAcess