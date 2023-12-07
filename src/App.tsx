import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from "react-router-dom";
import Admin from "./container/Admin/Admin";
import StaticPages from "./container/StaticPages/StaticPages";

function App() {

  return (
    <>
      <header><Toolbar/></header>
      <main className="container">
        <Routes>
          <Route path="/" element={<StaticPages/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/pages/:pageName" element={<StaticPages/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
