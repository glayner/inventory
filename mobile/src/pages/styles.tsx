import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from "react-native-responsive-screen";
import colors from "../components/Colors";


export default StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding: hp("5%"),
    // backgroundColor: "#000"
  },

  body: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: 'visible',
    borderRadius: 15,
    marginLeft: 150,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("10%"),
  },

  createBody: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: 'visible',
    borderRadius: 15,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("10%"),
  },

  TransactionBtn: {
    fontSize:14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    width: wp("30%"),
    maxWidth: "max-content",
    padding: 3,
    backgroundColor: colors.COLOR_PRIMARY,
    // fontFamily: "Poppins_400Bold",
  },

  title: {
    color: colors.COLOR_SECUNDARY,
    fontSize: 28,
    // fontFamily: "Poppins_700Bold",
  },

  titleHeader: {
    justifyContent: 'center',
    maxWidth: 50
  },

  firstTitleHeader: {
    justifyContent: 'center',
    width: wp("85%"),
    maxWidth: 130,
  },

  titleBuySale: {
    justifyContent: 'center',
    width: wp("85%"),
    maxWidth: 150,
  },

  titleTotal: {
    justifyContent: 'center',
    width: wp("85%"),
    maxWidth: 200,
  },

  saleRow: {
    justifyContent: 'center'
  },

  firstSaleCol: {
    backgroundColor: colors.SALE,
    justifyContent: 'center',
    fontSize: wp("4%"),
    width: wp("85%"),
    maxWidth: 130
  },

  saleCol: {
    backgroundColor: colors.SALE,
    justifyContent: 'center',
    fontSize: wp("4%"),
    width: wp("85%"),
    maxWidth: 50
  },

  saleColLow: {
    backgroundColor: colors.SALELOW,
    justifyContent: 'center',
    fontSize: wp("4%"),
    width: wp("85%"),
    maxWidth: 50
  },

  buyRow: {
    
  },

  firstBuyCol: {
    backgroundColor: colors.BUY,
    justifyContent: 'center',
    fontSize: wp("4%"),
    width: wp("85%"),
    maxWidth: 130
  },

  buyCol: {
    backgroundColor: colors.BUY,
    justifyContent: 'center',
    fontSize: wp("4%"),
    width: wp("85%"),
    maxWidth: 50
  },

  buyColLow: {
    backgroundColor: colors.BUYLOW,
    justifyContent: 'center',
    fontSize: wp("4%"),
    width: wp("85%"),
    maxWidth: 50
  },

  table: {
    overflow: 'visible',
  },

  inputs: {
    color: colors.FONT_PRIMARY,
    fontSize: 14,
    width: wp("85%"),
    borderBottomColor: "#BBBBBB",
    // fontFamily: "Poppins_400Regular",
    borderBottomWidth: 2,
    marginTop: hp("2%"),
    maxWidth: 300,
  },

  button: {
    backgroundColor: colors.BUTTONS_COLOR,
    padding: hp("2%"),
    marginTop: hp("3%"),
    display: "flex",
    alignItems: "center",
    width: wp("80%"),
    borderRadius: 10,
    marginLeft: hp("3%"),
    maxWidth: 300
  },
  dataHeader:{},
  dataHeaderFirstTitle:{
    width: 250,
    justifyContent: 'center',
    alignItems: "center",
  },
  dataHeaderTitle:{
    width: 80,
    justifyContent: 'center',
    alignItems: "center",
  },
  dataRow:{
  },

  dataFirsCel:{
    justifyContent: 'center',
    alignItems: "center",
    color: colors.FONT_PRIMARY,
    width: 250,
  },

  dataCel:{
    justifyContent: 'center',
    alignItems: "center",
    color: colors.FONT_PRIMARY,
    width: 80,
  },

  createBtn:{
    borderWidth: 1,
    borderColor: colors.BUTTONS_COLOR,
    backgroundColor: colors.COLOR_PRIMARY,
    color: colors.FONT_PRIMARY,
    width: 'max-content',
    borderRadius: 10,
    display: "flex",
    alignItems: "center",  
    padding: hp("2%"),   
    margin: hp("2%"),   
  },

  optionBtn:{
    borderWidth: 1,
    color: colors.FONT_PRIMARY,
    borderColor: colors.BUTTONS_COLOR,
    width: 'max-content',
    borderRadius: 10,
    display: "flex",
    alignItems: "center", 
    justifyContent: "center", 
    padding: hp("1%"),   
    // marginHorizontal: hp("5%"),   
  }
});
