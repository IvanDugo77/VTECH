import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPage } from './pages/UserPage';



function App() {
  return (<>
    <Header/>
    <main> 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/productoId/:id" element={<ProductPage/>}/>
        <Route path="*" element= {<NotFoundPage />}/>
        <Route path="/usuario/:id" element={<UserPage/>}/>
      </Routes>
      <Footer />
    </main>
    <ToastContainer position="bottom-right" pauseOnHover color="white" font-family="Courier New"/>
    </>
  );
}

export default App;
