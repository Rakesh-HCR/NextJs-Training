import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/product-header'
import ProductList from '../pages/product-listing/product-listing'
import { Grid } from "@material-ui/core"

export default function Home(props) {
  return (
        <>
        <Head>
            <title> Awesome shopping site </title>
            <meta
                  name="description"
                  content="Awesome shopping site,Men`s t-shirt, Sweatshirt"
                />
        </Head>
        <Grid container direction="column" spacing={8}>
              <Grid container item>
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={12} sm={10}>
                      <Header/>
                    </Grid>
                    <Grid item xs={false} sm={1} />
              </Grid>
              <Grid item container>
                <Grid item xs={false} sm={1} />
                <Grid item xs={12} sm={10} style={{backgroundColor : "#eeeeee"}}>
                  <ProductList/>
                </Grid>
                <Grid item xs={false} sm={1} />
              </Grid>
        </Grid>
        </>
  )
}
