import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
  },

  body: {
    background: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialised'
  },

  'body, input, textarea, button': {
    font: '400 1rem Roboto, sans-serif',
  },

  button: {
    cursor: 'pointer'
  }
}) 