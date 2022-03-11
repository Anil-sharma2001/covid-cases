import React, {useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"

function LineGraphes() {
 const [data, setData]=useState({});
 
 //https://disease.sh/v3/covid-19/historical/all?lastdays=30

 useEffect(()=>{
     fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30').then
     ((response)=>{
       console.log('hello',response.json); 
      return response.json
    }).then
     ((data)=>{
       
      setData(data);
     })
 },[])

console.log(data);
    return (
    <div>
      <h1>i am a grapgh</h1>
        {/* <Line 
        data
        option
        /> */}
    </div>
  )
}

export default LineGraphes;