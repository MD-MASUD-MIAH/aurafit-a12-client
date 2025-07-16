import { Navigate, useLocation } from 'react-router'

import useRole from '../hooks/useRole'
import Loader from '../shared/Loader'

const AdminAccess = ({ children }) => {
  const { role, isRoleLoading} = useRole()
  const location = useLocation()
  console.log(location)
  console.log('I was here, in Admin route')
  if (isRoleLoading) return <Loader></Loader>
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default  AdminAccess