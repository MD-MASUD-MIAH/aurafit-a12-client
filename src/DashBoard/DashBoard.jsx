import React, { useEffect, useState } from 'react';

import useAxiosSecure from '../hooks/useAxiosSecure';



const DashBoard = () => {

   

 
  
    const [users, setUsers] = useState([]);
    
    const axiosInstance = useAxiosSecure();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get('/user');
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [axiosInstance]);

  console.log(users);
  

    return (
        <div>
            <h1>I ma desh Board</h1>
        </div>
    );
};

export default DashBoard;