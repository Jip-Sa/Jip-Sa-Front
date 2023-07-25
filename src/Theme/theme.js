import { createTheme } from "@mui/material/styles";

const NotoSansKRBold = "../font/NotoSansKR-Bold.otf";
const NotoSansKRMedium = "../font/NotoSansKR-Medium.otf";
const NotoSansKRRegular = "../font/NotoSansKR-Regular.otf";

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
    level1: "#19D730",
    level2: "#F4EA36",
    level3: "#F49136",
    level4: "#F44336",
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
            `,
    },
  },
});

export default theme;
