
import { CircularProgress, Box } from '@mui/material';

export default function APPLoading(){
    return(
        <>
  <Box
      sx={{
        backgroundColor: '#ffffff',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        sx={{
          color: '#442604ff',
        }}
        size={60}
        thickness={5}
      />
    </Box>   </> )
}