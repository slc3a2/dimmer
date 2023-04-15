const DARK_COLOR = '#e0e0e0'
const LIGHT_COLOR = '#2c2c2c'

const COLORS = {
  dark: DARK_COLOR,
  light: LIGHT_COLOR,
}

const WindowsIconZoomOut = (props: { theme: 'dark' | 'light' }) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2524"
      width="200"
      height="200"
    >
      <path
        d="M98.23 451.003l829.685-1.992 0.154 64-829.685 1.992z"
        fill={COLORS[props.theme]}
        p-id="2525"
      ></path>
    </svg>
  )
}

const WindowsIconZoomIn = (props: { theme: 'dark' | 'light' }) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6209"
      width="200"
      height="200"
    >
      <path
        d="M800 928H224c-70.692 0-128-57.308-128-128V224c0-70.692 57.308-128 128-128h576c70.692 0 128 57.308 128 128v576c0 70.692-57.308 128-128 128z m64-704c0-35.346-28.654-64-64-64H224c-35.346 0-64 28.654-64 64v576c0 35.346 28.654 64 64 64h576c35.346 0 64-28.654 64-64V224z"
        p-id="6210"
        fill={COLORS[props.theme]}
      ></path>
    </svg>
  )
}

const WindowsIconClose = (props: { theme: 'dark' | 'light' }) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5280"
      width="200"
      height="200"
    >
      <path
        d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z"
        fill={COLORS[props.theme]}
        p-id="5281"
      ></path>
    </svg>
  )
}

export { WindowsIconZoomOut, WindowsIconZoomIn, WindowsIconClose }
