import { styled } from '@mui/system';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  backgroundColor: '#f9f9f9', // רקע אפור עדין
}));

export const ContainerLocal = styled('div')({
  padding: 0,
  margin: 0,
  backgroundColor: '#fff', // רקע לבן
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

export const FieldsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
}));

export const ButtonFullRow = styled('button')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const FieldWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

export const FieldLabel = styled('label')(({ theme }) => ({
  textAlign: 'right',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  fontSize: '1.1rem',
  fontWeight: 'bold',
}));

export const FormControlStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const TextFieldContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const TextFieldStyled = styled('input')(({ theme }) => ({
  marginTop: theme.spacing(0),
}));

export const DateField = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(0),
  padding: theme.spacing(0),
}));

export const ErrorText = styled('span')({
  color: 'red',
});

export const Header = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'right',
  width: '100%',
}));

export const HeaderMin = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  textAlign: 'right',
  width: '100%',
}));

export const ButtonStyled = styled('button')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  minWidth: '150px',
}));

export const SelectStyled = styled('select')({
  textAlign: 'right',
});

export const CardStyled = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff', // רקע לבן לכרטיסים
  marginBottom: theme.spacing(2.5), // מרווח של 20 פיקסלים בין הכרטיסים
  boxShadow: theme.shadows[1],
}));

export const CardLabel = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'right',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // צל קל
}));

export const DividerStyled = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 0), // מרווח של 16 פיקסלים למעלה ולמטה
  height: '3px', // עובי הפס
  backgroundColor: theme.palette.primary.main, // צבע הפס
}));
