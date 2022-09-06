import React from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import Allquestions from './Allquestions';
import './css/main.css';

function Main({ questions }) {
  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="main-top">
            <h2>All Questions</h2>
            <Link to="/add-question">
              <button>Ask Question</button>
            </Link>
          </div>
          <div className="main-desc">
            <p>{questions && questions.length} Questions</p>

            <div className="main-filter">
              <div className="main-tabs">
                <div className="main-tab">
                  <Link to="">Newest</Link>
                </div>

                <div className="main-tab">
                  <Link to="">Active</Link>
                </div>

                <div className="main-tab">
                  <Link to="">More</Link>
                </div>
              </div>

              <div className="main-filter-items">
                <FilterListIcon />
                <p>Filter</p>
              </div>
            </div>
          </div>
          <div className="allquestion">
            {questions.map((_q, index) => (
              <>
                <div key={index} className="question">
                  <Allquestions questions={_q} />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
