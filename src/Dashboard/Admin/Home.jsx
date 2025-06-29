import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = ({test}) => {

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      {test}
    </div>
  );
};

export default Home;
