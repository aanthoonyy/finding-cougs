import { red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import { createTheme, styled } from "@mui/material/styles";

export const theme = createTheme({
palette: {
    background: {
        default: '#9d2208',
    },
    primary: {
        main: '#9d2208', 
    },
    secondary: {
        main: '#ffffff',
    },
},
});

// export const Item = styled(Paper)(({ theme }) => ({
//     // backgroundColor: theme.palette.primary.main,
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
// }))
export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#9d2208',
    }),
  }));
