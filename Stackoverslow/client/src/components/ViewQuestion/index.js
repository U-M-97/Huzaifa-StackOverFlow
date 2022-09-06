import React from 'react';
import Sidebar from '../Stackoverflow/Sidebar';
import Mainquestion from './Mainquestion';
import '../Stackoverflow/css/index.css';
function index() {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <Mainquestion />
      </div>
    </div>
  );
}

export default index;
