import React,{useState,useEffect} from 'react';
import { Grid } from "@material-ui/core";
import {getAllProductHandles,getProductData} from '../../lib/retrieve-product'
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Header from '../../components/product-header'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import Head from 'next/head'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Box from '@material-ui/core/Box';
import InputLabel  from '@material-ui/core/InputLabel';


const useStyles = makeStyles({
  root: {
    paddingLeft : "20px",
    backgroundColor:"#fbe9e7"

  },
  media: {
    height: "400px",
    width: "70%",
    marginInline : "auto"
  },
  backToHome : {
    margin: "3rem 6rem 9rem"
  },
  MuiDividerVertical : {
    width: "2px"
  },
  formControl: {
    minWidth: "200"
  },
  gridContainer: {
    backgroundColor:"#fbe9e7",
    paddingTop:"30px"
  },
  detailText : {
    lineHeight : "0px",
    fontWeight : 600
  }
});

export default function ProductDetail({productDtl}){
    const classes = useStyles();
    const [size, setSize] = useState("Large");

    const handleChange = (event) => {
        setSize(event.target.value);
    }
    const PriceAndAvailability = () => {
      const variantSelected = productDtl.variants.filter((variant) => variant.title == size)[0]
      return (
            <Box display="flex">
                <Box p={2}>
                    Available : {variantSelected.available ? "Yes" : "No"}
                </Box>
                <Box p={2}>
                    Price : {variantSelected.price}
                </Box>
           </Box>
      )
    }
    return (
    <>
        <Head>
            <title>Product Detail</title>
        </Head>
        <Grid container direction="column" spacing={8}>
            <Grid container item>
                <Grid item xs={false} sm={1} />
                <Grid item xs={12} sm={10}>
                    <Header />
                </Grid>
                <Grid item xs={false} sm={1} />
            </Grid>
            <Grid item container style={{marginTop:"inherit",height:"520px"}}>
                <Grid item xs={false} sm={1} />
                <Grid item container xs={12} sm={10} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.root}>
                            <CardMedia className={classes.media} image={productDtl.images[0].src} title={productDtl.title} />
                        </Card>
                    </Grid>
                    <Divider className={classes.MuiDividerVertical} variant="middle" orientation="vertical" flexItem />
                    <Grid item xs={12} sm={5} style={{paddingLeft:"20px"}}>
                        <Typography variant="h5">
                            {productDtl.title}
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            <div dangerouslySetInnerHTML={{
                                          __html: productDtl.body_html
                                        }} className={classes.detailText}></div>
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            Vendor: {productDtl.vendor}
                        </Typography>
                        <Box display="flex">
                            <Box p={1}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel  margin="dense" htmlFor="select-variant-label" component="label"><Typography variant="h5" color="textPrimary"> Variants</Typography></InputLabel>
                                    <Box p={2}/>
                                    <NativeSelect defaultValue="Large" onChange={handleChange} inputProps={{
                                        name: 'name',
                                        id: 'select-variant-label'
                                    }}>
                                    {
                                        productDtl.variants.map((variant)=>(
                                            <option value={variant.title}>{variant.title}</option>
                                        ))
                                    }
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Box>
                        <Typography variant="subtitle2">
                            <PriceAndAvailability />
                        </Typography>
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
                <Grid item xs={false} sm={1} />
            </Grid>
        </Grid>
        <Typography align="center" gutterBottom>
            <Link href="/">
            ← Back to home
            </Link>
        </Typography>
     </>
    )
}


export async function getStaticPaths(){
    const paths = getAllProductHandles();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const productDtl = getProductData(params.handle);
    return {
        props :{
            productDtl
        }
    }
}