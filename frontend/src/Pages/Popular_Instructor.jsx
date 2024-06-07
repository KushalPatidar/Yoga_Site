import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Instr_Card from './Instr_Card';
const Popular_Instructor = () => {
    const [FamousInstr, setFamousInstr] = useState([]);

    useEffect(() => {
      async function fetchFamousInstr() {
        try {
          const response = await axios.get('http://localhost:3000/popular-instructors');
          setFamousInstr(response.data);
        } catch (error) {
          console.error('Error fetching popular classes:', error);
        }
      }
  
      fetchFamousInstr();
    }, []);
    return (
      <div className='dc'>
        <h2>Our Famous Instructors</h2>
        <div className='cards'>
          {
          FamousInstr.map((item,index) => {
            return <Instr_Card key={index} a = {item}/>
          })
         }
        </div>
      </div>
    )
}

export default Popular_Instructor
