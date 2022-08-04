import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components/auth/RequireAuth';
import IndexRoute from './routes/IndexRoute';
import SigninRoute from './routes/SigninRoute';
import SignupRoute from './routes/SignupRoute';
import { AuthProvider } from './contexts/auth';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={
              <RequireAuth>
                <IndexRoute />
              </RequireAuth>
            } />
            <Route path="signin" element={
              <RequireAuth required={false}>
                <SigninRoute />
              </RequireAuth>
            } />
            <Route path="signup" element={
              <RequireAuth required={false}>
                <SignupRoute />
              </RequireAuth>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
