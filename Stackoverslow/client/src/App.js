import React, { Component, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Stackoverflow from './components/Stackoverflow';
import { Routes, Route } from 'react-router-dom';
import Question from './components/Askquestion/Question';
import ViewQuestion from './components/ViewQuestion';
import Auth from './components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { Navigate } from 'react-router-dom';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayname: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    console.log(user);
  }, [dispatch]);

  function PrivateRoute(props) {
    return user ? props.children : <Navigate to="/auth" />;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path={'/auth'}
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <>
                <Header />
                <Auth />
              </>
            )
          }
        />
        <Route
          exact
          path="/"
          element={
            <>
              <PrivateRoute>
                <Header /> <Stackoverflow />
              </PrivateRoute>
            </>
          }
        />
        <Route
          exact
          path="/add-question"
          element={
            <>
              <PrivateRoute>
                <Header /> <Question />
              </PrivateRoute>
            </>
          }
        />

        <Route
          exact
          path="/question"
          element={
            <>
              <PrivateRoute>
                <Header /> <ViewQuestion />
              </PrivateRoute>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
