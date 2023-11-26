import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

// CSS style for Card.Grid
const gridStyle: React.CSSProperties = {
  width: '20%',
  textAlign: 'center',  
};

// Interface defining the structure of a PostUser
interface PostUser {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Props interface for Posts component
interface PostsProps {
  selectedUserId: number;
  setSelectedUserId: (id: number) => void;
  selectedUserName: string;
  setSelectedUserName: (name: string) => void;
}

// Posts component
export const Posts: React.FC<PostsProps> = ({
  selectedUserId,
  setSelectedUserId,
  selectedUserName,
  setSelectedUserName,
}) => {
  // State for storing post details entered in the form
  const [postDetails, setPostDetails] = useState({ title: '', body: '' });
  // State for managing the dialog's open/close state
  const [open, setOpen] = React.useState(false);
  // Theme and media query for responsiveness
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog and reset postDetails state
  const handleClose = () => {
    setPostDetails({ title: '', body: '' });
    setOpen(false);
  };

  // State to hold fetched posts
  const [posts, setPosts] = useState<PostUser[]>([]);
  
  // Fetch posts based on selectedUserId
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`);
        const userPosts = await response.json();
        
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    if (selectedUserId !== 0) {
      fetchPosts();
    }
  }, [selectedUserId]);

  // Handle input change in the form fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle adding a new post
  const handleAddPost = () => {
    const newPost: PostUser = {
      userId: selectedUserId,
      id: posts.length + 1, // Assuming this is a new post ID (You might need to adjust this logic)
      title: postDetails.title,
      body: postDetails.body,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setPostDetails({ title: '', body: '' });
    setOpen(false);
  };

  return (
    <>
      <Card title={selectedUserName}>
        {/* Display existing posts */}
        {posts.map((post, index) => (
          <Card.Grid key={index} style={gridStyle}>
            {post.body}
          </Card.Grid>
        ))}
      </Card>

      {/* Add Post button and dialog */}
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Post
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Add a post"}
          </DialogTitle>
          <DialogContent>
            <div>
              <br />
              {/* Input fields for title and body */}
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                value={postDetails.title}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="outlined-multiline-static"
                label="Body Text"
                multiline
                rows={4}
                name="body"
                value={postDetails.body}
                onChange={handleInputChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            {/* Cancel and Add buttons */}
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleAddPost} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
