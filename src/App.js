
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Cart from './components/Cart';
function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <header className="App-header indie-flower-regular">
          <h1>Jounior electronic shop</h1>
        </header>
        <nav>
          <Link to="/signup" className='btn btn-primary m-2 indie-flower-regular'>🙋‍♂️Sign up</Link>
          <Link to="/signin" className='btn btn-primary m-2 indie-flower-regular'>🙎Sign in</Link>
          <Link to="/addproduct" className='btn btn-info m-2 indie-flower-regular'>🖥️add product</Link>
          <Link to="/" className='btn btn-info m-2 indie-flower-regular'>💻get product</Link>        </nav>
        <Routes>
          <Route path='/' element={<Getproduct />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/cart' element={<Cart />} />

        </Routes>

        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
