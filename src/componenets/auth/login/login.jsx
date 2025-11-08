import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress, TextField } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login_normal, setformInfo } from '../../../Reducer/user/auth/login';


export default function Login_page(){
  const {email,password} =useSelector((state)=> state.login_normal)
    const { isLoading } = useSelector((state) => state.login_normal);
  
  const dispatch =useDispatch()
  const navigate = useNavigate();
  
  //eventHandeler
  async function Login_Manaule() {
      const resultAction = await dispatch(login_normal());
      if (login_normal.fulfilled.match(resultAction)) {
    navigate("/app");
  } else {
    console.log("خطأ التسجيل:", resultAction.payload);
  }}
    return(
        <>
         
<Container  sx={{ height: '100vh', // يملىء كامل الشاشة
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',}} maxWidth="sm"  >  
            <Box   >
                 <Card sx={{backgroundColor:'rgba(255, 254, 252, 0.51)', marginTop:'5%',maxWidth: '100%',maxHeight:'100%' , // استخدم اللون من الثيم
              display: 'flex',borderRadius: '5px',
              boxShadow:'2px 3px 1px #6B5B2A',
        flexDirection: 'column',
        justifyContent: 'center', // توسيط عمودي
        alignItems: 'center', gap: 1, // هاد بيخلي في مسافة متساوية بين كل العناصر
    p: 3,  }}>
         <Typography  sx={{ fontFamily:'ENG', color: '#6B5B2A', fontSize: 24 ,fontWeight: 'bold'}}>
مواقيت الصلاة في سوريا اينما كنت 
 
       </Typography>
      <CardContent>
       
        
       
  
   <Box sx={{ mb:2 ,width: '100%', alignSelf: 'flex-start' }}>
    <TextField
    type='email'
     value={email}
    onChange={(e) => dispatch(setformInfo({ email: e.target.value }))}
    
      fullWidth
       sx={{
         '& label': {
      color: '#6B5B2A',
    },
    // لون اللابل وقت الفوكس
    '& label.Mui-focused': {
      color: '#AA842A',
    },
        borderRadius: '15%',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(134, 96, 21, 0.51)', // لون الإطار العادي
      },
      '&:hover fieldset': {
        borderColor: '#8E6E1F', // لما تمرر الماوس عليه
      },
      '&.Mui-focused fieldset': {
        borderColor: '#AA842A', // لما تضغط عليه (الفوكس)
      },
    },
  }}
      id="outlined-basic"
      variant="outlined"
      label="ادخل بريدك الالكتروني"
    />
  </Box> 
  <Box sx={{ mb:-2,width: '100%', alignSelf: 'flex-start' }}>
    <TextField
     value={password}
    onChange={(e) => dispatch(setformInfo({ password: e.target.value }))}
    
      fullWidth
      sx={{
        borderRadius: '15%',
         '& label': {
      color: '#6B5B2A',
    },
    // لون اللابل وقت الفوكس
    '& label.Mui-focused': {
      color: '#AA842A',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(134, 96, 21, 0.51)', // لون الإطار العادي
      },
      '&:hover fieldset': {
        borderColor: '#8E6E1F', // لما تمرر الماوس عليه
      },
      '&.Mui-focused fieldset': {
        borderColor: '#AA842A', // لما تضغط عليه (الفوكس)
      },
    },
  }}
      id="outlined-basic"
      variant="outlined"
      label="ادخل كلمة مرور جيدة"
    />
  </Box> 
  
      </CardContent>
          
 {isLoading ? (
  <LinearProgress sx={{ width: '100%', height: 6, borderRadius: 2 }} />
) : (
  <Button
    onClick={Login_Manaule}
    sx={{
      color: '#110f0dff',
      width: '90%',
      borderRadius: '5px',
      backgroundColor: 'rgba(134, 96, 21, 0.51)',
    }}
  >
     تسجيل الدخول
  </Button>
)}
  
 <Button        sx={{color:'#110f0dff', width: '80%', borderRadius: '5px',backgroundColor:'rgba(134, 96, 21, 0.51)' ,color:'black'}}
 >  باستخدام غوغل 
 
 <GoogleIcon sx={{color:'#47420eff'}}/>
 تسجيل الدخول
  </Button>

     <Link to='/sighn' style={ {textDecoration: 'none'}} >
                <Typography sx={{ mb: 1, fontWeight: 'bold' ,fontSize: 24,color:'#110f0dff' }}> انشاء حساب جديد ؟</Typography>

     </Link>
 
           <Typography sx={{ mb: 1, fontWeight: 'bold' ,fontSize: 24,color:'#6B5B2A' }}>في اي زمان ... في اي مكان</Typography>
      
    </Card>
                </Box>     
           
   
      </Container>
        
        
        </>
    )
}