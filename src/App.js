import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppBar from './components/App Bar/AppBar'
import SignUp from './screens/SignUp/SignUp'
import SignIn from './screens/SignIn/SignIn'

function App() {
  return (
    <div className="App">
      <SignIn/>
    </div>
  );
}

export default App;
