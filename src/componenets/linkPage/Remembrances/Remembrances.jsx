import * as React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { patchData, postData, postDataWithToken } from '../../../Backend/ApiServeces';

export default function RemembranceCard({ id,text, reward ,likedInitially,isCategoryRead}) {
  const [liked, setLiked] = React.useState(likedInitially || false);

async function handleFavorite(id){
  try {
    
    const formData = new FormData();
    formData.append("category_id", id);
console.log("category_id المرسل:", id);

    const r=await postDataWithToken(`http://127.0.0.1:5174/api/favorites/toggle`, formData);
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
<Typography
  variant="body1"
  sx={{
    textDecoration: isCategoryRead ? "line-through" : "none",
    opacity: isCategoryRead ? 0.5 : 1,
  }}
>
  {text}
</Typography>
                 

        </Box>
         <Box sx={{ display: 'flex',gap:2 }}>

          <IconButton  onClick={() => handleFavorite(id)} color={liked ? 'error' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          
                  </Box>
        {reward && <Typography variant="caption" color="text.secondary">ثواب: {reward}</Typography>}
      </CardContent>
    </Card>
  );
}
