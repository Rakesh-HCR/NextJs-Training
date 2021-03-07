import React, {useState,useEffect  } from 'react';
import products from '../../products/products.json'
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CardMedia } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Link from 'next/link'
import ProductCart from '../../components/product-cart'

const useStyles = makeStyles({
  root: {
    maxWidth: "300px",
    paddingLeft : "10px",
    paddingRight : "10px",
    height: "350px"
  },
  media: {
    marginTop: "25px",
    maxWidth: "200px",
    backgroundColor : "#eeeeee",
    minHeight: "230px"
  },
  actions: {
      display: "flex",
      justifyContent: "space-between"
  },
   cartRoot: {
        height : "100%"
   },
   titleStyle : {
        fontSize:12,
        fontWeight:700
   }
});
export default function ProductList() {
    const classes = useStyles();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [showCart, setShowCart] = useState(false);

    const ProductPrice = (props) => {
        const variantSelected = props.variants.filter((variant) => variant.title == "Large")[0]
        return (
            variantSelected.price
        )
    }
    useEffect(() => {
        if(cart.length === 0){
            setShowCart(false)
            setTotal(0)
         }
    },[cart]);

    useEffect(() => {
        const cartParams = JSON.parse(localStorage.getItem('cartParam'));
        if (cartParams) {
            setCart(cartParams.cartItems);
            setQuantity(Number(cartParams.quantity));
            setTotal(Number(cartParams.total));
            setShowCart(Boolean(cartParams.showCart));
        }
      }, []);

      useEffect(() => {
        const cartParam = {
            "cartItems" : cart,
            "quantity" : quantity,
            "total" : total,
            "showCart" : showCart,
        }
        localStorage.setItem('cartParam', JSON.stringify(cartParam));
      }, [cart,quantity,total,showCart]);

    const removeFromCart = (cardItem) =>{
        setCart(
          cart.filter((cartItem) => cartItem.title !== cardItem.title)
        )
        setTotal(total-cardItem.price);
        setQuantity(quantity-1);
    }

    const addToCart = (product) =>{
        const price = Number(ProductPrice(product));
        const title = product.title;
        setShowCart(true);
        if(cart.filter((cardItem) => cardItem.title == title).length){
            const cartData = cart.filter((cardItem) => cardItem.title == title)[0];
            cartData.count = cartData.count + 1;
            cartData.price += price;
        }else{
            setQuantity(quantity+1)
            const cardItem = {
                "title" : title,
                "price" : price,
                "count" : 1,
                "image" : product.images[0].src
            }
            setCart([...cart, {...cardItem}])
        }

        setShowCart(true)
        setTotal(total+price);
    }
    return(
        <Grid container spacing={2} style={{backgroundColor : "#eeeeee"}}>
            <Grid item sm={8}>
                <Grid container spacing={2}>
                    {
                    products.products.map((product,index) =>(
                    <Grid item sm={4}>
                        <Card className={classes.root}>
                            <Link href={`/product-details/${product.handle}`}>
                            <CardActionArea style={{height : "300px"}}>
                                <CardMedia component="img" className={classes.media} image={product.images[0].src} />
                                <Box display="flex">
                                    <Box p={1}>
                                        <Typography variant="subtitle2" className={classes.titleStyle} align="left" display="initial">
                                            {product.title}
                                        </Typography>
                                    </Box>
                                    <Box p={1}>
                                        <Typography variant="subtitle2" className={classes.titleStyle}>
                                            £<ProductPrice {...product} />
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardActionArea>
                            </Link>
                            <CardActions>
                                <div className={classes.actions}>
                                    <Button variant="contained" color="secondary" size="small" onClick={() => addToCart(product)}>ADD TO CART</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))

                    }
                </Grid>
            </Grid>
            <Grid item sm={4} className={classes.cartRoot}>
                <ProductCart quantity={quantity} showCart={showCart} cart={cart} totalPrice={total} removeFromCart={removeFromCart}/>
            </Grid>
        </Grid>
    )
}

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
