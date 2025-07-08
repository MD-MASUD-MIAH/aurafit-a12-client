import { use  } from 'react'
import { AuthContext } from '../Context/AuthContext'



const useAuth = () => {
  const auth = use(AuthContext)
  return auth
}

export default useAuth
