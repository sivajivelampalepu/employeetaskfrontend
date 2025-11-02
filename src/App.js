import logo from './logo.svg';
import './App.css';
import './mystyle.css'
import Header from './Container/Header';
import Footer from './Container/Footer';
import EmployeeTable from './Container/Bees/EmployeeTable';
import Loader from './Container/Bees/Loader';

function App() {
  return (
    <div className="App">
      <Loader/>
      <Header/>
      <EmployeeTable/>

      <Footer/>
     
    </div>
  );
}

export default App;
