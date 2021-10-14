import { useLocation } from 'react-router-dom';
import { Paper, makeStyles, Grid, Typography } from '@material-ui/core';
import Comments from './Comments/Comments';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '5px',
    marginTop: '1rem',
    paddingBottom: '10px',
    minHeight: '10vh',
    marginBottom: '10px',
  },
  paper: {
    margin: 'auto',
    marginBottom: '2rem',
    marginTop: '1rem',
    width: '90%',
    padding: '20px',
  },
  blogSection: {
    // background: 'linear-gradient(to right, #d7d2cc, #304352)',
    // backgroundColor: '#ddffaa',
    // backgroundImage: `url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23AE9' fill-opacity='0.53' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E)`,
    // marginBottom: '2rem',

    // backgroundColor: '#487346',
    // backgroundImage: `url(
    //   "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%234c8e43' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%236aac5f' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%234c8e43' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%236aac5f' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%2389CC7C' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%23768c3a' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%2396ac58' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%2396ac58' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%23768c3a' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%23768c3a' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%2396ac58' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E"
    // )`,

    backgroundColor: '#330000',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  },
  sectionHeader: {
    margin: '1rem',
  },
  commentSection: {
    background: '#ffffff5e',
    padding: '2rem',
  },
});

export default function ViewBlog(props) {
  const location = useLocation();

  const blog = location.state;

  const classes = useStyles();

  const [blogData, setBlogData] = useState(blog);

  return (
    <Grid container className={classes.root}>
      <Grid item container className={classes.blogSection}>
        <Grid item className={classes.sectionHeader}>
          <Typography variant="h5" style={{ color: 'white' }}>
            Your Read:
          </Typography>
        </Grid>
        <Grid container item>
          <Paper elevation={3} className={`blog ${classes.paper}`}>
            <h1 className="blog-title">{blogData.blogTitle}</h1>
            <p className="blog-body">{blogData.blogBody}</p>
          </Paper>
        </Grid>
      </Grid>
      <Grid item className={classes.commentSection} xs={9}>
        <Comments blogId={blogData._id} comments={blogData.comments} />
      </Grid>
    </Grid>
  );
}
