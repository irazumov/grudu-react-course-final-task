import { Outlet } from 'react-router-dom';
import './App.css';
import SignupForm from './components/auth/SignupForm';

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
