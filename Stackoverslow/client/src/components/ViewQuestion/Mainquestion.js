import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar } from '@mui/material';
import ReactQuill from 'react-quill';
import './css/index.css';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function Mainquestion() {
  const [show, setshow] = useState(false);
  const [answer, setanswer] = useState('');
  const [comment, setcomment] = useState('');
  const user = useSelector(selectUser);

  const [questiondata, setquestiondata] = useState();

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('q');

  const handlequill = (value) => {
    setanswer(value);
  };

  useEffect(() => {
    async function getQuestiondetails() {
      await axios
        .get(`/api/question/${id}`)
        .then((res) => {
          setquestiondata(res.data[0]);
          console.log(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getQuestiondetails();
  }, [id]);

  async function getUpdatedAnswer() {
    await axios
      .get(`/api/question/${id}`)
      .then((res) => {
        setquestiondata(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlesubmit = async () => {
    if (answer !== '') {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios
        .post('/api/answer', body, config)
        .then((res) => {
          console.log(res.data);
          alert('Answer added successfully');
          setanswer('');
          getUpdatedAnswer();
        })
        .catch((err) => console.log(err));
    }
  };

  const handlecomment = async () => {
    if (comment !== '') {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      await axios
        .post(`/api/comment/${id}`, body)
        .then((res) => {
          console.log(res.data);
          setshow(false);
          getUpdatedAnswer();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questiondata?.title}</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>{new Date(questiondata?.created_at).toLocaleString()}</p>
            <p>
              Active <span>today</span>
            </p>
            <p>
              Viewed <span>43</span>
            </p>
          </div>
        </div>

        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">⬆ </p>
                <p className="arrow">0</p>
                <p className="arrow">⬇ </p>
                <BookmarkIcon />
                <HistoryIcon />
              </div>
            </div>

            <div className="question-answer">
              <p>{ReactHtmlParser(questiondata?.body)}</p>
              <div className="author">
                <small>
                  Asked {new Date(questiondata?.created_at).toLocaleString()}
                </small>
                <div className="author-details">
                  <Avatar src={questiondata?.user?.photo} />
                  <p>{questiondata?.user?.displayname}</p>
                </div>
              </div>
              <div className="comments">
                {questiondata?.comments &&
                  questiondata?.comments?.map((_qd) => {
                    <p>
                      {_qd?.comment} <span>{_qd?.user.displayname}</span>
                      <small>
                        {new Date(_qd?.created_at).toLocaleString()}
                      </small>
                    </p>;
                  })}
                <div className="comment"></div>
                <p
                  onClick={() => {
                    setshow(!show);
                  }}
                >
                  Add a comment
                </p>
                {show && (
                  <div className="title">
                    <textarea
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                      type="text"
                      style={{
                        margin: '5px 0px',
                        padding: '10px',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: '3px',
                        outline: 'none',
                      }}
                      placeholder="add your comment"
                      row={5}
                    ></textarea>
                    <button onClick={handlecomment}>Add comment</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="all-questions" style={{ flexDirection: 'column' }}>
          <p
            style={{
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: '300',
            }}
          >
            {questiondata?.answerDetails?.length} Answers
          </p>
          {questiondata?.answerDetails?.map((_q, index) => (
            <div key={index} className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <p>⬆ </p>
                  <p>0</p>
                  <p>⬇ </p>
                  <BookmarkIcon />
                  <HistoryIcon />
                </div>
              </div>
              <div className="question-answer">
                <p>{ReactHtmlParser(_q?.answer)}</p>
                <div className="author">
                  <small style={{ marginBottom: '4px' }}>
                    Answer {new Date(_q?.created_at).toLocaleString()}
                  </small>
                  <div className="auth-details">
                    <Avatar src={_q?.user?.photo} />
                    <p>{_q?.user?.displayname}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3 style={{ fontSize: '22px', margin: '10px 0', fontWeight: '400' }}>
          Your answer
        </h3>
        <ReactQuill
          onChange={handlequill}
          className="react-quill"
          theme="snow"
          style={{ height: '200px' }}
        />
      </div>{' '}
      <button
        type="submit"
        onClick={handlesubmit}
        style={{ marginTop: '100px' }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default Mainquestion;
