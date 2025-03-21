import React from "react";
import "./App.css";
import Image from "./components/image";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Custom Image Component</h1>
      <div style={{ height: "200vh", padding: "20px" }}>
        <Image
          src="https://picsum.photos/500/300?random=1"
          alt="Creative asset 1"
          width={500}
          height={300}
          quality={80}
          className="rounded-lg mb-4"
        />
      </div>
      <div style={{ height: "200vh", padding: "20px" }}>
        <Image
          src="https://picsum.photos/500/300?random=2"
          alt="Creative asset 2"
          width={500}
          height={300}
          quality={60} // Lower quality for demo
          className="rounded-lg mb-4"
        />
      </div>
    </div>
  );
};

export default App;
