import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import MyPets from './pages/Pet/MyPets/MyPets';

// components
import Navbar from './components/layouts/Navbar/Navbar';
import Footer from './components/layouts/Footer/Footer';
import Message from './components/layouts/Message/Message';
import Profile from './pages/User/Profile';
import AddPet from './pages/Pet/AddPet/AddPet';
import EditPet from './pages/Pet/EditPet/EditPet';
import PetDetails from './pages/Pet/PetDetails/PetDetails';
import MyAdoptions from './pages/Pet/MyAdoptions/MyAdoptions';

// context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <div className="container my-5">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/pet/mypets' element={<MyPets />} />
            <Route path='/pet/add' element={<AddPet />} />
            <Route path='/pet/edit/:id' element={<EditPet />} />
            <Route path='/pet/:id' element={<PetDetails />} />
            <Route path='/pet/adoptions' element={<MyAdoptions />} />
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
