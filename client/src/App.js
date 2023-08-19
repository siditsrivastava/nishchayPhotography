import './App.css';
import Home from './Components/Home/Home';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Gallery from './Components/Gallery/Gallery'
import Video from './Components/Video/Video'
import Faq from './Components/FAQ/Faq';
import Contactus from './Components/ContactUs/Contactus';
import UploadImage from './Components/admin/UploadImage';
import Uploadfaq from './Components/admin/Uploadfaq';
import UploadVideo from './Components/admin/UploadVideo';
import Prewedding from './Components/Prewedding/Prewedding';
import UploadPreweddingImg from './Components/admin/UploadPreweddingImg';
import FullPic from './Components/Gallery/FullPic'
import { useEffect , useState} from 'react';
import Loading from './Components/Loading/Loading';

function App() {

  const [loading , setLoading] = useState(false);

  useEffect( () => {
     setTimeout(() => {
      setLoading(true);
     }, 2000);
  }, [])
  
  return (
   <>
     <BrowserRouter>
     {loading ? 
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Gallery" element={<Gallery/>}/>
      <Route path="/PreWedding" element={<Prewedding/>}/>
      <Route path="/video" element={<Video/>}/>
      <Route path="/faq" element={<Faq/>}/>
      <Route path="/contactUs" element={<Contactus/>}/>
      <Route path="/Upload/gallery" element={<UploadImage/>}/>
      <Route path="/Upload/Faq" element={<Uploadfaq/>}/>  
      <Route path="/Upload/youtube/videoLink" element={<UploadVideo/>}/> 
      <Route path="/Upload/prewedding" element={<UploadPreweddingImg/>}/> 
      <Route path="/Upload/:image" element={<FullPic/>}/> 
     </Routes> : <Loading/> }
     </BrowserRouter>
   </>
  );
}

export default App;
