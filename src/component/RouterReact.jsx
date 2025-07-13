import React ,{Suspense,lazy}from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
const Food=lazy(()=>import('./Food.jsx'));
const Menu=lazy(()=>import('./Menu.jsx'));
const FormValidation=lazy(()=>import('./FormValidation.jsx'));
const Todo=lazy(()=>import('./Todo.jsx'))
const LocationApi=lazy(()=>import('./LocationApi.jsx'))
function RouterReact() {
  return (
    <Router>
      <nav>
        <Link to="/">Form Validation</Link> |  <Link to="/food">Browse Restaurants</Link> |  <Link to="/todo">Todo List</Link> | <Link to="/locationApi">Location API</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<FormValidation />} />
         <Route path="/todo" element={<Todo />} />
         <Route path="/locationApi" element={<LocationApi />} />
       <Route path="/food" element={<Food />} />
<Route path="/food/menu/:REstroID" element={<Menu />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default RouterReact;
