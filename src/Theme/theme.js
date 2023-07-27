import { createTheme } from "@mui/material/styles";

const NotoSansKRBold = "../font/NotoSansKR-Bold.otf";
const NotoSansKRMedium = "../font/NotoSansKR-Medium.otf";
const NotoSansKRRegular = "../font/NotoSansKR-Regular.otf";
const isunsinBold = "../font/isunsinB.ttf";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20",
    },
    secondary: {
      main: "#43a047",
    },
  },
  colors: {
    level0: "#A5A5A5",
    level1: "#19D730",
    level2: "#F4EA36",
    level3: "#F49136",
    level4: "#F44336",
    trade: "#ff8c00",
    rent: "#00ff00",
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
                @font-face {
                    font-family: 'Noto Sans KR';
                    font-weight: 700;
                    src: local('NotoSansKR-Bold'), url(${NotoSansKRBold}) format('otf');
                },
                @font-face {
                    font-family: 'Noto Sans KR';
                    font-weight: 500;
                    src: local('NotoSansKR-Medium'), url(${NotoSansKRMedium}) format('otf');
                },
                @font-face {
                    font-family: 'Noto Sans KR';
                    font-weight: 400;
                    src: local('NotoSansKR-Regular'), url(${NotoSansKRRegular}) format('otf');
                },
                @font-face {
                    font-family: 'isunsin';
                    font-weight: 500;
                    src: local('isunsinB'), url(${isunsinBold}) format('ttf');
                },
            `,
    },
  },
});

export default theme;
