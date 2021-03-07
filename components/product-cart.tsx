import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      height: "100%",
      width: "95%"
    },
    red: {
      color: '#fff',
      backgroundColor: "#e57373",
    },
    media: {
      width : "50px"
    },
    textFont: {
     fontWeight:"bold"
    },
    priceCellStyle : {
       width:"30%"
    }
})


export default function ProductCart({quantity,cart,totalPrice,showCart,removeFromCart}) {
  const classes = useStyles();
  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  return(
     <Card className={classes.root}>
          <CardContent>
                <Box display="flex">
                    <Box p={2}>
                        <Typography component="h6" variant="h5">CART</Typography>
                    </Box>
                    <Box p={1}>
                        <Avatar className={classes.red}>{quantity}</Avatar>
                    </Box>
                 </Box>
          </CardContent>
          <CardActionArea>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                { showCart ?
                    <caption style={{backgroundColor:"#eeeeee"}}>
                        <Box display="flex">
                            <Box>
                                <Typography component="h6" className={classes.textFont} variant="h5">Total</Typography>
                            </Box>
                            <Box/>
                            <Box style={{paddingLeft:"140px"}}>
                                <Typography component="h6" variant="h5">£{totalPrice.toLocaleString(undefined, currencyOptions)}</Typography>
                            </Box>
                         </Box>
                     </caption>
                    :
                    <></>
                }
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><Typography className={classes.textFont} variant="subtitle2">ITEM</Typography></TableCell>
                      <TableCell align="center"><Typography className={classes.textFont} variant="subtitle2">PRICE</Typography></TableCell>
                      <TableCell align="center"><Typography className={classes.textFont} variant="subtitle2">QUANTITY</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  { showCart ?
                    <TableBody>
                        {cart.map((cardItem,index) => (
                          <TableRow>
                              <TableCell align="center" component="th" scope="row">
                                    <CardMedia component="img"  className={classes.media} image={cardItem.image} title={cardItem.title} />
                                    <Typography  variant="subtitle2" style={{fontSize:10,fontWeight:700}} align="left">
                                        {cardItem.title}
                                    </Typography>
                              </TableCell>
                              <TableCell align="center">£{cardItem.price.toLocaleString(undefined, currencyOptions)}</TableCell>
                              <TableCell align="right">
                                    <Box display="flex">
                                        <Box p={1}></Box>
                                        <Box width="50%" borderColor="secondary.main" border={1}><Typography align="center">{cardItem.count}</Typography></Box>
                                    </Box>
                                  <CardActions>
                                      <Box display="flex" p={1}>
                                        <Button onClick={() => removeFromCart(cardItem)}  className={classes.priceCellStyle} variant="contained" color="secondary" size="small">Remove</Button>
                                      </Box>
                                  </CardActions>
                              </TableCell>

                            </TableRow>
                        ))}
                      </TableBody>
                      :
                      <TableBody>
                          <TableRow>
                              <TableCell/>
                              <TableCell variant="body" style={{fontSize:"12px"}}>
                                No Items in the Cart
                              </TableCell>
                              <TableCell/>
                          </TableRow>
                      </TableBody>
                  }

                </Table>
          </TableContainer>
          </CardActionArea>
      </Card>
  )
}