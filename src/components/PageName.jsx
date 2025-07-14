import React, { useEffect } from 'react';

export const PageName =(title)=>{


    useEffect(()=>{


        document.title = ` ${title}  || AuraFit`
    },[title])
}