// import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import SobreNos from './components/pages/SobreNos'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/Navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
        <Route  path="/" element={<Home/>}></Route>
        <Route  path="/sobrenos" element={<SobreNos/>}></Route>
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
