import{BrowserRouter,Routes,Route} from'react-router-dom';

import './App.css';
import Header from'./Header'
import Signin from './pages/Signin'
import Posts from'./pages/Posts'
import NewPost from'./pages/Newpost'
function App() {
  return (<BrowserRouter>
  <Header></Header>
  <Routes>
    <Route path="/" element={<Posts/>}></Route>
    <Route path="/signin" element={<Signin/>}>註冊登入</Route>
    <Route path="/new-post" element={<NewPost/>}></Route>
  </Routes>
  </BrowserRouter>);
}

export default App;
