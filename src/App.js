import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <header className="App-header">
          <h1>Welcome to sokogarden</h1>
        </header>
        <nav>
          <Link to="/signup" className='btn btn-primary m-2'>Signup</Link>
          <Link to="/signin" className='btn btn-info m-2'>Signin</Link>
          <Link to="/addproduct" className='btn btn-danger m-2'>addproduct</Link>
          <Link to="/" className='btn btn-secondary m-2'>getproduct</Link>
          

        </nav>
        <Routes>
          <Route path='/' element={<Getproduct />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/makepayment' element={<Makepayment />} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
