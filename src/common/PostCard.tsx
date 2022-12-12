import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import { Box, Button } from '@mui/material'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles({
  root: {
    padding: "10px !important",
  },
  test: {
    borderRadius: "10px",
    '& .MuiCardContent-root': {
      padding: "7px"
    },
    '& .MuiCardActions-root': {
      padding: "0px"
    }
  }
})
export default function PostCard(props: any) {
  //console.log("props", props)
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const { username, postLink, like, uploadTime, postCaption } = props.post;
  const month = new Date(uploadTime).toLocaleString('default', { month: 'long' });
  const year = new Date(uploadTime).getFullYear();
  const day = new Date(uploadTime).getDate();
  const timeArray = new Date(uploadTime).toLocaleTimeString().split(":");
  const internationHourTime = new Date(uploadTime).getHours();
  const AM_OR_PM = internationHourTime >= 12 ? "PM" : "AM";
  const newTime = `${day} ${month}, ${year} ${timeArray[0]}:${timeArray[1]} ${AM_OR_PM}`

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card sx={{ maxWidth: 345, width: 600 }}
      className={classes.test}
      elevation={3}
    >
      <CardHeader
        className={classes.root}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={newTime}
      />
      <CardMedia
        component="img"
        height="350"
        image={postLink}
        alt={postLink.split("-")[3]}
        title={postLink.split("-")[3]}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="Like-post" onClick={() => { setLiked(!liked) }}>
          <FavoriteIcon sx={{ color: liked ? "red" : "rgba(0, 0, 0, 0.54)" }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography ml={2}> {liked ? like + 1 : like} likes</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <CardContent>
        {
          postCaption ? "postCaption" : <Typography variant="body2" color="text.secondary">😂😂😂😂😂😂😂😂😂</Typography>
        }
        <Typography variant="body2" color="text.secondary">View All Comments</Typography>
        {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography> */}
        <Box>
          <input type="text" title="comment" style={{ width: "80%" }} onKeyPress={(e) => { if (e.charCode === 13) { console.log("Enter presses") } }} />
          <Button variant='contained' sx={{ height: "25px", width: "20%" }}>Post</Button>
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}