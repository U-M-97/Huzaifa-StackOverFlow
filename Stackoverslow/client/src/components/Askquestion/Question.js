import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill's css which is important
import './css/Question.css';
import { TagsInput } from 'react-tag-input-component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from 'axios';

function Question() {
  const user = useSelector(selectUser);

  const [title, settitle] = useState('');
  const [body, setbody] = useState('');
  const [tags, settags] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlequill = (value) => {
    setbody(value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    if (title !== '' || body !== '') {
      const bodyJSON = {
        title: title,
        body: body,
        tags: JSON.stringify(tags),
        user: user,
      };

      await axios.post('/api/question', bodyJSON).then((res) => {
        alert('Question added');
        setloading(false);
        navigate('/');
      });
    }
  };

  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagining youa are asking a question to
                  another person
                </small>
                <input
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Add question title"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handlequill}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add upto 5 adds to describe what your question is about
                </small>
                <TagsInput
                  value={tags}
                  onChange={settags}
                  name="tags"
                  placeHolder="press enter to add a tag"
                />
              </div>
            </div>
          </div>
        </div>
        <button disabled={loading} type="submit" onClick={handlesubmit}>
          {loading ? 'Adding Question..' : 'Add your Question'}
        </button>
      </div>
    </div>
  );
}

export default Question;
