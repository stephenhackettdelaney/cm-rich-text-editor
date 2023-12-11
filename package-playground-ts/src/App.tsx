import './App.css';
import { Heading, TipTapEditor } from "cm-rich-text-editor"

function App() {
  return (
    <div className="App" style={{ maxWidth: "640px", margin: "0 auto" }}>
      <Heading />
      <TipTapEditor {...input} />
    </div>
  );
}

const input = {
  name: "test-tip-tap",
  onBlur: (event: any) => console.log("onBlur event ", event),
  onChange: (event: any) => console.log("onChange event ", event),
  onFocus: (event: any) => console.log("onFocus event ", event),
  type: "text",
}

export default App;
