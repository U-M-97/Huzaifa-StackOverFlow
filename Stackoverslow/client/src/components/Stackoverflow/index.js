import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import './css/index.css';
import axios from 'axios';

function Index() {
  const [questions, setquestions] = useState([]);

  useEffect(() => {
    async function getquestion() {
      await axios
        .get('/api/question')
        .then((res) => {
          setquestions(res.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getquestion();
  }, []);

  console.log(questions);
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <Main questions={questions} />
      </div>
    </div>
  );
}

export default Index;
