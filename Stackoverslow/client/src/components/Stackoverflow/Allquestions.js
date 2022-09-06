import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import './css/Allquestion.css';
import ReactHtmlParser from 'react-html-parser';

function Allquestions({ questions }) {
  let tags = [];
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '..' : str;
  };
  return (
    <div className="all-questions">
      <div className="all-question-container">
        <div className="all-question-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>Votes</span>
            </div>
            <div className="all-option">
              <p>0</p>
              <span>Answers</span>
            </div>
            <div className="all-option">
              <p>0</p>
              <small>Views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${questions?._id}`}>{questions?.title}</Link>
          <div style={{ width: '90%' }}>
            <div>{ReactHtmlParser(truncate(questions?.body, 500))}</div>
          </div>

          {tags.map((tag, index) => {
            <>
              <div style={{ display: 'flex' }}>
                <span key={index} className="question-tags">
                  {tag}
                </span>
              </div>
            </>;
          })}

          <div className="author">
            <small style={{ marginBottom: '4px' }}>
              {new Date(questions?.created_at).toLocaleString()}
            </small>
            <div className="author-details">
              <Avatar src={questions?.user?.photo} />
              <p>{questions?.user?.displayname}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allquestions;
