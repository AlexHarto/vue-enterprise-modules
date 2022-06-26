export default {
  notifications: {
    notification1: {
      title: '¡Enhorabuena!',
      message1: '¡Lo conseguiste!',
      message2: '¡Disfruta de nuestro servicio!',
    },
    notification2: {
      title: '¡Hola {0}!',
      message: '¡Es un placer verte de nuevo!',
    },
  },
  errors: {
    generic:
      'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
    required: 'Este campo es requerido.',
    password_confirmation_doesnt_match:
      'Las contraseñas no coinciden. Por favor, verifique las contraseñas e inténtelo de nuevo.',
    'auth/email-already-in-use':
      'El email ya está registrado. Por favor, utilice otro email o intente con Login.',
    'auth/invalid-email':
      'Email inválido. Por favor, compruebe el email y vuelva a intentarlo.',
    'auth/operation-not-allowed': 'Operación no permitida.',
    'auth/weak-password':
      'La contraseña es muy débil. Por favor, use una contraseña más fuerte con al menos 6 caracteres.',
    'auth/user-not-found':
      'No tenemos registrada esa dirección de email. Por favor, verifique su email e inténtelo de nuevo o Signup.',
    'auth/invalid-password':
      'Contraseña incorrecta. Por favor, inténtelo de nuevo o Signup con otra dirección de correo.',
  },
  aria: {
    icon: 'Icono',
  },
};
