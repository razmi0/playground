import { FormActionTest } from "./components/FormActionTest.tsx";
import { TransitionTest } from "./components/TransitionTest.tsx";
import "./index.css";

function App() {
    return (
        <>
            <TransitionTest />
            <div className="h-40"></div>
            <FormActionTest />
        </>
    );
}

export default App;
