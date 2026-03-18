import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <header className="App-header">
          <h1>Welcome to sokogarden</h1>
        </header>
        <nav>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/addproduct">addproduct</Link>

        </nav>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
