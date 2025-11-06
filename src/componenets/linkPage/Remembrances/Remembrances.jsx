import * as React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function RemembranceCard({ text, reward }) {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">{text}</Typography>
          <IconButton onClick={() => setLiked(!liked)} color={liked ? 'error' : 'default'}>
            <FavoriteIcon />
          </IconButton>
        </Box>
        {reward && <Typography variant="caption" color="text.secondary">ثواب: {reward}</Typography>}
      </CardContent>
    </Card>
  );
}
