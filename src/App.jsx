import React, { useState } from "react";
import Navbar from "./components/navbar";
import People from "./components/people";
import Planets from "./components/planets";

const App = () => {
  const [page, setPage] = useState("planets");

  return (
    <div className="App">
      <h1>Starwars Info</h1>
      <Navbar setPage={setPage} />
      <div className="content">
        {page === "planets" ? <Planets /> : <People />}
      </div>
    </div>
  );
};

export default App;
