import './home.css';
import skeletonBlogImage from '../assets/blog-skeleton.jpeg';

import {
  makeStyles,
  Paper,
  ButtonBase,
  Grid,
  Typography,
} from '@material-ui/core';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '5px',
    paddingBottom: '10px',
    minHeight: '10vh',
    maxHeight: '27vh',
    marginBottom: '10px',
  },
  paper: {
    margin: 'auto',
    width: '80%',
    padding: '10px',
  },
  image: {
    margin: '5px',
    width: '100%',
    overflow: 'hidden',
    height: 140,
    border: '1px ridge orange',
  },
});

export default function Blog(props) {
  const classes = useStyles();
  const history = useHistory();

  function openBlog(id) {
    axios.get(`/api/blog/view-blog/${id}`).then((res) => {
      history.push({
        pathname: `/view-blog/${id}`,
        state: res.data,
      });
    });
  }
  const date = new Date(props.item.createdAt);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} className="thumbnail">
            <ButtonBase className={classes.image}>
              <img className={classes.img} src={skeletonBlogImage} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom className="line-clamp-title">
                  {props.item.blogTitle}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {date != 'Invalid Date'
                    ? `published: ${
                        date.getMonth() + 1
                      }/${date.getDate()}/${date.getFullYear()}`
                    : ''}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className="line-clamp"
                  style={{ whiteSpace: 'preWrap' }}
                >
                  {props.item.blogBody}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ float: 'right', cursor: 'pointer' }}
                  onClick={(e) => openBlog(props.item._id)}
                >
                  More..
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
