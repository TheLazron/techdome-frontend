import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#FFFFFF",
    secondary: "#D4D2D1",
    black: "#000000",
    white: "ffffff",
  },
};

const customTheme = extendTheme({
  colors,
});

export default customTheme;
