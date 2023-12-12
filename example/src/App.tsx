import './App.css';
import { useState } from 'react';
import { TipTapEditor, TipTapText } from "lib"
import styled from "styled-components"

function App() {
  const [title, setTitle] = useState("Some working article title!")
  const [content, setContent] = useState(JSON.stringify("{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"}}]}"))

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
        <label htmlFor='title'>
          Title
          <input id="title" type="text" onChange={(event) => setTitle(event.target.value)} value={title} />
        </label>
        <TipTapEditor {...input} />
      </section>
      <section className='display-container'>
        <h1>{title}</h1>
        <TipTapText
          content={json}
        // {...styleProps}
        />
      </section>
    </Grid>
  );
}

// const styleProps = {
//   $FontFamily_Headings: "PTSansNarrow-Regular",
//   $Color_Headings: "green",
//   // - - - - - - - - - - - - - - - - - 
//   $FontFamily_Paragraph: "Kalnia-Light",
//   $Color_Paragraph: "blue",
//   // - - - - - - - - - - - - - - - - - 
// }

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 640px 1fr;
  gap: 20px;

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 22px;

    input {
      text-indent: 4px;
      padding: 8px 4px;
      margin-bottom: 32px;
    }
  }
  
  section.display-container {
    padding: 32px
  }

  section.editor-container {
    background: #f5f5f5;
    padding: 32px 16px;
  }
`



export default App;
