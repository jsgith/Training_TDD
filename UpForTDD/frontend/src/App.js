import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import { UserSignupPage } from './pages/UserSignupPage';

function App() {


  return (
    <div className="App">
      <UserSignupPage/>
      {/* <Navbar />
      <Card img="IMG-20181028-WA0003.jpg"
            rating="5.0"
            reviewCount={6}
            country="USA"
            title="Life Lessons with Katie Zaferes"
            price={136}/> */}
    </div>
  );
}

export default App;
