import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../public/Classes.css"
import Card2 from './Card2';
const Classes = () => {
  const [Classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await axios.get('http://localhost:3000/all_class');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching popular classes:', error);
      }
    }

    fetchClasses();
  }, []);
  return (
    <div className='classes'>
      <h2>Classes</h2>
      <div className='cards'>
        {
        Classes.map((item,index) => {
          return <Card2 key={index} a = {item}/>
        })
       }
      </div>
    </div>
  )
}

export default Classes
