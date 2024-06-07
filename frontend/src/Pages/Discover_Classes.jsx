import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import "../../public/Discover_Classes.css"
const Discover_Classes = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    async function fetchPopularClasses() {
      try {
        const response = await axios.get('http://localhost:3000/popular-classes');
        setPopularClasses(response.data);
      } catch (error) {
        console.error('Error fetching popular classes:', error);
      }
    }

    fetchPopularClasses();
  }, []);
  return (
    <div className='dc'>
      <h2>Our Top Classes</h2>
      <p>Explore a world of wellness and vitality</p>
      <p>with our yoga classes at AsanaVibes.</p>
      <div className='cards'>
        {
        popularClasses.map((item,index) => {
          return <Card key={index} a = {item}/>
        })
       }
      </div>
    </div>
  )
}

export default Discover_Classes
