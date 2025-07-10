import {  useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import Loader from '../shared/Loader';

const BookingPage = () => {
    const {id} = useParams()
 const { isPending, data: singleData = {} } = useQuery({
    queryKey: ["singleData", id],
    queryFn: async () => {
      const res = await axios?.get(
        `${import.meta.env.VITE_API_URL}/trainer/${id}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>
  }

  console.log(singleData);

    return (
        <div>
           <form action="
           ">

            <h1>{singleData.fullName}</h1>
            <input type="text" name="" id="" />
           </form>
            
        </div>
    );
};

export default BookingPage;