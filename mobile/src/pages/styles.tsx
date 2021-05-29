import { StyleSheet } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import colors from "../components/Colors";


export default StyleSheet.create({
  container: {
    padding: heightPercentageToDP("5%"),
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: widthPercentageToDP("5%"),
    backgroundColor: "#fff",
  },
  inputs: {
    color: colors.FONT_PRIMARY,
    fontSize: widthPercentageToDP("4%"),
    width: widthPercentageToDP("85%"),
    borderBottomColor: "#BBBBBB",
    fontFamily: "Poppins_400Regular",
    borderBottomWidth: 2,
    marginTop: heightPercentageToDP("2%"),
  },
  button: {
    backgroundColor: colors.BUTTONS_COLOR,
    padding: heightPercentageToDP("2%"),
    marginTop: heightPercentageToDP("3%"),
    display: "flex",
    alignItems: "center",
    width: widthPercentageToDP("80%"),
    borderRadius: 10,
    marginLeft: heightPercentageToDP("3%"),
  },
});
