import { Routes, Route } from 'react-router-dom';

import './App.css';
import AllPosts from './components/AllPosts';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import NewsFeed from './components/NewsFeed';
import Register from './components/Register';
import SignIn from './components/SignIn';

function App() {

  return (
    <Routes>
      <Route path='register' element={<Register />} />
      <Route path='signin' element={<SignIn />} />

      <Route path='/' element={<NewsFeed />} >
        <Route path='home' element={<Home />} />
        <Route path='profile' element={<MyProfile />} />
        <Route path='posts' element={<AllPosts />} />
      </Route>
    </Routes>
  );
}

export default App;
