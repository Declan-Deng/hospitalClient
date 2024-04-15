// GlobalStyles.js
import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  noPaddingInput: {
    backgroundColor: "transparent",
    fontSize: 19,
  },
  container: {
    flex: 1,
    padding: 28,
  },

  button: {
    
    borderRadius: 10,
    width: "40%",
    alignSelf: "center",
    marginTop: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 0
  },

  ButtonFontStyles: {
    fontSize: 20,
  },
});

export default GlobalStyles;
