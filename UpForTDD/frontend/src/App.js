import './App.css';
import { UserSignupPage } from './pages/UserSignupPage';
import * as apiCalls from './api/apiCalls';

function App() {

  const actions = {
    postSignup: apiCalls.signup
  }

  return (
    <div className="App">
      <UserSignupPage actions={actions}/>
    </div>
  );
}

export default App;
