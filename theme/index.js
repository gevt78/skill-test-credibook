import { createTheme } from '@mui/material/styles'

const global = {
  // Maximum content width when resolution is large
  maxContentWidth: 1280,
}

const color = {
  silver: '#BDBFBE',
  white: '#fff',
  wildSand: '#F5F5F5',
}

const muiTheme = {
  color,
  global,
}

export default createTheme(muiTheme)