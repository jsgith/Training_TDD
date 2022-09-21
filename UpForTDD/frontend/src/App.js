import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import { UserSignupPage } from './pages/UserSignupPage';
import * as apiCalls from './api/apiCalls';

function App() {

  const actions = {
    postSignup: apiCalls.signup
  }

  return (
    <div className="App">
      <UserSignupPage actions={actions}/>
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
