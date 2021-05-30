import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
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
  TransactionBtn: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: widthPercentageToDP("4%"),
    borderRadius: widthPercentageToDP("2%"),
    width: widthPercentageToDP("30%"),
    height: widthPercentageToDP("10%"),
    backgroundColor: '#ccc',
    fontFamily: "Poppins_400Bold",
  },
  
  title: {
    color: colors.COLOR_SECUNDARY,
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
  },
  titleHeader: {
    justifyContent: 'center'
  },
  redRow: {
    justifyContent: 'center'
  },

  redCol: {
    backgroundColor: 'rgba(224,32,65,0.9)',
    justifyContent: 'center',
    fontSize: widthPercentageToDP("4%"),
    width: widthPercentageToDP("85%"),
    maxWidth: 130
  },
  redColLow: {
    backgroundColor: 'rgba(224,32,65,0.7)',
    justifyContent: 'center',
    fontSize: widthPercentageToDP("4%"),
    width: widthPercentageToDP("85%"),
    maxWidth: 130
  },

  greenRow: {

  },

  greenCol: {
    backgroundColor: 'rgba(145,193,69, 0.9)',
    justifyContent: 'center',
    fontSize: widthPercentageToDP("4%"),
    width: widthPercentageToDP("85%"),
    maxWidth: 130
  },

  greenColLow: {
    backgroundColor: 'rgba(145,193,69, 0.7)',
    justifyContent: 'center',
    fontSize: widthPercentageToDP("4%"),
    width: widthPercentageToDP("85%"),
    maxWidth: 130
  },

  table: {
    overflow: 'visible',
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
