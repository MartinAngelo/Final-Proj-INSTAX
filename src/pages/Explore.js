import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from "../components/Nav";
import mugiwara from "../images/mugiwara.gif";
import luffy from "../images/luffy.gif";
import zoro2 from "../images/zoro2.gif";
import nami from "../images/nami.gif";
import usopp from "../images/usopp.gif";
import sanji from "../images/sanji.gif";
import chopper from "../images/chopper.gif";
import robin from "../images/robin.gif";
import franky from "../images/franky.gif";
import brook from "../images/brook.gif";
import jimbei from "../images/jimbei.gif";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3
  // , 4, 5, 6, 7, 8, 9, 10,
  //             11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  //             21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  //             31, 32, 33
            ];

export default function Explore() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <Nav />
        <h1>Explore</h1>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={mugiwara}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={luffy}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={zoro2}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={nami}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={usopp}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={sanji}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={chopper}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={robin}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={franky}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={brook}
                  /> 
                </Card>
              </Grid>
              
            ))}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={jimbei}
                  /> 
                </Card>
              </Grid>
              
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}