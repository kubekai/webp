
import './App.css';
import Multbutton from  './Multbutton';
import HelloCGU from './HelloCGU';
function App() {
  return (
    <div className="App">
       <div>
        {HelloCGU()}
      </div>
      <div>
        {Multbutton(10)}
      </div>
       
    </div>
  );
}

export default App;
