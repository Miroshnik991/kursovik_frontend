import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '../../https';

// Стили для компонента
const RegisterPaper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '50vw',
  maxWidth: '400px',
  backgroundColor: '#fff',
  border: '2px solid #000',
  boxShadow: '0 0 10px #000',
  padding: theme.spacing(2),
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const RegisterForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const RegisterField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '1rem',
  fontWeight: '400',
  marginTop: theme.spacing(0.5),
}));

// Функция для валидации email
function isValidEmail(email) {
  // Простейшая проверка формата email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Компонент модального окна регистрации
function RegisterModal(props) {
  // Состояние для полей формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  // Обработчик изменения полей формы
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Обновить состояние соответствующего поля
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    // Валидация email и пароля
    const newErrors = {};

    if (!isValidEmail(email)) {
      newErrors.email = 'Неверный формат email';
    }
    if (password.trim() === '') {
      newErrors.password = 'Пароль не может быть пустым';
    }

    // Установить состояние ошибок
    setErrors(newErrors);

    // Если есть ошибки, прервать действие
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    // Обработка отправки формы
    asyncHandler(email, password);
  };

  const asyncHandler = async (email, password) => {
	const response = await api.post('/login', {'email': email, 'password': password});
	if (response.data) {
		props.onClose();
		props.setUser(response.data);
	}
  }


  return (
    <Modal open={props.open} onClose={props.onClose}>
      <RegisterPaper>
        <Typography variant="h5" textAlign="center">
          Авторизация
        </Typography>
        <RegisterForm onSubmit={handleSubmit}>
          <RegisterField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={handleInputChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            required
          />
          <RegisterField
            name="password"
            variant="outlined"
            label="Пароль"
            type="password"
            value={password}
            onChange={handleInputChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
            required
          />
          <RegisterButton type="submit" variant="contained" color="primary">
            Войти
          </RegisterButton>
        </RegisterForm>
      </RegisterPaper>
    </Modal>
  );
}

// Валидация пропсов
RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterModal;