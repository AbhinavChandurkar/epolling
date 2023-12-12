import "./App.css";
import StateForm from "./components/StateForm";

function App() {
  return (
    <div className="background-image">
      <div>
        <h1 className="text-5xl font-extrabold pt-5 mb-2 text-center">
          E-POLLING
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-center">
          India Decides 2024: Your Voice, Your Vote, Our Future
        </h2>
      </div>
      <StateForm />
    </div>
  );
}

export default App;
