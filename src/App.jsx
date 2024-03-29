import './App.css';
import Docker from './Components/Docker.jsx';
import Login from './Components/Login.jsx';
import Images from './Components/Images.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Docker />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/images" element={<Images />}/>
          <Route path="/container" element={<Navigate to="/"/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;