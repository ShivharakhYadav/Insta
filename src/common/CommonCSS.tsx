import { makeStyles } from "@mui/styles"

const styles = makeStyles({
    textFiledStyle: {
        //margin: "auto !important",
        //width: "calc(100% - 20%)"
        // backgroundColor: "tomato"
    },
    buttonStyle: {
        background: "#424549 !important"
    },
    mainContainer: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // height: "100%",
    },
    gridContainer: {
        justifyContent: "center",
        //background: "#D6E4E5",
        //width: "500px !important",
        height: "430px",
        // width: "fit-content",
        '& > *': {
            display: "flex",
            flexDirection: "column !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            //fontFamily: "Roboto Slab",
        },
        '& > *:nth-of-type(1)': {
            textAlign: "center",
            borderRadius: "25px",
            fontFamily: "Roboto Slab",
        },
        '& .MuiTypography-root': {
            fontFamily: "Roboto Slab",
        }
    }
});
export default styles;