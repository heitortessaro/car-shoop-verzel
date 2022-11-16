import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import './App.css';
import ControlForm from './pages/controlForm/ControlForm';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ControlForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
