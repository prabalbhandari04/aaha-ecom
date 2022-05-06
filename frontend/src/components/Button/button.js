import React from 'react';
import Button from '@mui/material/Button';
import red from '@mui/material/colors/red';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from '@emotion/react';

const customTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#222831",
    },
  }
});


function button(){
    return(
            <ThemeProvider theme={customTheme}>
              <Button variant="contained" color="primary">
                Visit Store
              </Button>
            </ThemeProvider>
        //     <customTheme theme={customTheme}>
        //     <Button variant="fab" color="palette.primary">
        //     Visit Store
        //     </Button>
        // </customTheme>
    )
}

export default button;