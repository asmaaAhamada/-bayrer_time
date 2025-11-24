import * as React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { patchData, postData, postDataWithToken } from '../../../Backend/ApiServeces';
import { BaseUrl, Favourite_Toogel } from '../../../Backend/Api';
import { fetchFavorites } from '../../../Reducer/payere/favourite';

import { useDispatch, useSelector } from "react-redux";

export default function RemembranceCard({ id, text, reward, isCategoryRead }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const liked = favorites.includes(id);

  async function handleFavorite(id){
    try {
      const formData = new FormData();
      formData.append("category_id", id);
      await postDataWithToken(`${BaseUrl}${Favourite_Toogel}`, formData);
      
      // بعد التعديل على المفضلة، إعادة جلبها من السيرفر
      dispatch(fetchFavorites());
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 12 }}>
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton onClick={() => handleFavorite(id)} color={liked ? 'error' : 'default'}>
            <FavoriteIcon />
          </IconButton>
        </Box>
        {reward && <Typography variant="caption" color="text.secondary">ثواب: {reward}</Typography>}
      </CardContent>
    </Card>
  );
}


