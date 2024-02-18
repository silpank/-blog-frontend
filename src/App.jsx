import './App.css';
import Header from './Components/Header'; 
import Footer from './Components/Footer';
import Auth from './Components/Auth';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <section>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='*' element={<PageNotFound />} />
          
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
