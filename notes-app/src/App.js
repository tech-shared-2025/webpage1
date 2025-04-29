import{ BrowserRouter as Router, Route, Router, Routes} from 'react-router-dom'
import Home from '/Home';
import Header from './Header';

export default function App(){
  return(
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<><Header/><Home/></>}/>
        </Routes>
      </Router>
    </div>
  )
}