import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root { 
        --bg-color : #140e34;
        --border-radius : 12px;
    }
  body {
    min-height: 100vh;
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
    
  }
  h1,h2,h3,h4,h5,h6 { 
    color : rgb(255, 214, 10)
  }
  p { 
    color : white;
  }

  .markdown img { 
    display: block;
    margin : 0 auto;
  }

`;

export default GlobalStyle;
