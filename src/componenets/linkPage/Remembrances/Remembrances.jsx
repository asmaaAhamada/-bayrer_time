import * as React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { postData, postDataWithToken } from '../../../Backend/ApiServeces';

export default function RemembranceCard({ id,text, reward ,likedInitially}) {
  const [liked, setLiked] = React.useState(likedInitially || false);
  const [see, setSee] = React.useState(false);

async function handleFavorite(id){
  try {
    
    const formData = new FormData();
    formData.append("category_id", id);
console.log("category_id المرسل:", id);

    const r=await postDataWithToken(`http://127.0.0.1:8000/api/favorites/toggle`, formData);
    console.log(r)
    setLiked(!liked);

    
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}


  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex',gap:12 }}>
          <Typography variant="body1">{text}</Typography>
                 

        </Box>
         <Box sx={{ display: 'flex',gap:2 }}>

          <IconButton  onClick={() => handleFavorite(id)} color={liked ? 'error' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          <IconButton  color={see ? 'success' : 'default'}>
            <RemoveRedEyeIcon />
          </IconButton>
                  </Box>
        {reward && <Typography variant="caption" color="text.secondary">ثواب: {reward}</Typography>}
      </CardContent>
    </Card>
  );
}
