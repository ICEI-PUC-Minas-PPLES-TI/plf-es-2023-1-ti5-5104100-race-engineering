// import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
         {/* <div> "/" => <SobreNos> </div> */}
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App;
