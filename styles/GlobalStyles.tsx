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
  @keyframes rainbow-text-animation {
  0% {
    background-size: 57%;
    background-position: 0 0;
  }
  20% {
    background-size: 57%;
    background-position: 0 1em;
  }
  100% {
    background-size: 300%;
    background-position: -9em 1em;
  }
}

@keyframes rainbow-text-animation-rev {
  0% {
    background-size: 300%;
    background-position: -9em 1em;
  }
  20% {
    background-size: 57%;
    background-position: 0 1em;
  }
  100% {
    background-size: 57%;
    background-position: 0 0;
  }
}

  .header-text:hover {
  animation: rainbow-text-animation 0.5s ease forwards;
}
  .header-text { 
  width:8em;
  font-size: 40px;
  line-height: 0.9em;
    background: #CA4246;
  background-color: #CA4246;
  background: conic-gradient(
    #CA4246 16.666%, 
    #E16541 16.666%, 
    #E16541 33.333%, 
    #F18F43 33.333%, 
    #F18F43 50%, 
    #8B9862 50%, 
    #8B9862 66.666%, 
    #476098 66.666%, 
    #476098 83.333%, 
    #A7489B 83.333%);
  
  background-size: 100%;
  background-repeat: repeat;
  
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  
  animation: rainbow-text-animation-rev 0.5s ease forwards;

  cursor: pointer;
  }
 
  .markdown img { 
    display: block;
    margin : 0 auto;
  }

`;

export default GlobalStyle;
