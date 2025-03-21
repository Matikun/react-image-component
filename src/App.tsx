import React from "react";
import "./App.css";
import Image from "./components/image";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Custom Image Component</h1>
      <Image
        src="https://via.placeholder.com/500x300"
        alt="Creative asset"
        width={500}
        height={300}
        className="rounded-lg"
      />
    </div>
  );
};

export default App;
