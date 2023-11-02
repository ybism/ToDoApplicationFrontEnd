import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
     {/* <Home/> */}
     <Routes>
      <Route path={'/home'} element={<Home/>}/>
      <Route path={'/sign-up'} element={<SignUp/>}/>
      <Route path={'/'} element={<SignIn/>}/>
      {/* <Route path={'/profile-upload'} element={<ImageUpload/>}/> */}
    </Routes>
    </div>
  );
}

export default App;
