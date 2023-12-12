import './App.css';
import { useState } from 'react';
import { TipTapEditor, TipTapDisplay } from "lib"
import styled from "styled-components"

function App() {
  const [content, setContent] = useState(JSON.stringify("{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"}}]}"))
  console.log("content : ", content)
  const input = {
    name: "test-tip-tap",
    onBlur: (event: any) => setContent(JSON.stringify(event)),
    onChange: (event: any) => setContent(JSON.stringify(event)),
    onFocus: (event: any) => setContent(JSON.stringify(event)),
    type: "text",
  }

  const json = content ? JSON.parse(content) : {}

  return (
    <Grid>
      <section className='editor-container'>
        <TipTapEditor {...input} />
      </section>
      <section className='display-container'>
        <TipTapDisplay content={json} />
      </section>
    </Grid>
  );
}

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 640px 1fr;
  gap: 20px;

  section.display-container {
    padding: 32px
  }

  section.editor-container {
    background: #f5f5f5;
    padding: 32px 16px;
  }
`



export default App;
