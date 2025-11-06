import * as React from 'react';
import { Box } from '@mui/material';
import RemembranceCard from './Remembrances';

export default function AfterMealRemembrances () {
  const morningRemembrances = [
    { text: 'اللّهُ لا إلهَ إلا هوَ الحيُّ القيّوم', reward: 'عظيم' },
    { text: 'أَصْبَحْنَا وَأَصْبَحَ المُلْكُ للهِ', reward: 'كبير' },
    // ضع المزيد لاحقًا من الباك
  ];

  return (
    <Box sx={{ mt: 2 }}>
      {morningRemembrances.map((rem, index) => (
        <RemembranceCard key={index} text={rem.text} reward={rem.reward} />
      ))}
    </Box>
  );
}
