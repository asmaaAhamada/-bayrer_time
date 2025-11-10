import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,CircularProgress
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SatelliteIcon from "@mui/icons-material/Satellite";
import { useDispatch, useSelector } from "react-redux";
import { setformInfo, update } from "../../../Reducer/user/update";


export default function EdieModal({ open, onClose ,onSuccess}) {
  const dispatch = useDispatch();
  const { formInfo, isLoading ,error } = useSelector((state) => state.update);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    dispatch(setformInfo({ [name]: files ? files[0] : value }));
  };

  const handleSubmit = () => {
    dispatch(update()).unwrap().then(() => {
      onClose();
    });
  };
     
  return (
    <>
      {error && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "red",
            color: "white",
            padding: "24px 36px",
            borderRadius: "10px",
            fontSize: "22px",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: 2000,
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
            minWidth: "300px",
          }}
        >
          {error}
        </Box>
      )}

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="add-employee-modal"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "40%",
            height: "80%",
            p: 4,
            borderRadius: 3,
            direction: "rtl",
            outline: "none",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* زر الإغلاق */}
          <HighlightOffIcon
            onClick={onClose}
            sx={{ fontSize: "25px", cursor: "pointer", mb: 1, float: "left" }}
          />

          {/* العنوان */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
             
              fontSize: "22px",
              mb: 1,
              borderBottom: "3px solid",
             
              display: "inline-block",
              pb: 0.5,
            }}
          >
            تعديل  بيانات 
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1, flexGrow: 1, columnGap: 6 }}>
            {/* العمود الأيمن */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 0.7, fontWeight: "700" }}>
الاسم               </Typography>
                <TextField
                  fullWidth
                  name="name"
                value={formInfo.name}
          onChange={handleChange}
                  size="small"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 0.7, fontWeight: "700" }}>
البريد الالكتروني               </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                 value={formInfo.email}
          onChange={handleChange}
                  size="small"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 0.7, fontWeight: "700" }}>
                  صورة البروفايل
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    width: "90%",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    padding: "6px 8px",
                    border: "1px solid #ccc",
                    color: "#333",
                    backgroundColor: "#fff",
                  }}
                >
                  تحميل صورة
                  <input
                    type="file"
                    name="avatar"
                    hidden
                    accept="image/*" onChange={handleChange}
                  />
                  <SatelliteIcon sx={{ mr: 1, color: "gray" }} />
                </Button>
              </Box>

            
            </Grid>

            {/* العمود الأيسر */}
            
          </Grid>

          {/* زر الإضافة */}
          <Box sx={{ mt: 3, textAlign: "left", mt: "auto" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading}
             sx={{
                borderRadius: "20px",
                width: "100px",
                color: "white",
                fontSize: "18px",
                fontWeight: "700",
                textTransform: "none",
              }}
          >
            {isLoading ? "جاري الحفظ..." : "حفظ"}
          </Button>
               <Button
               onClick={onClose}
              variant="contained"
              sx={{
                borderRadius: "20px",
                width: "100px",
                color: "white",
                fontSize: "18px",
                fontWeight: "700",
                textTransform: "none",
              }}
            >
               {/* {editLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "إضافة"
              )} */}
              تراجع
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
