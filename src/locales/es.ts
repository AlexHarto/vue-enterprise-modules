export default {
  header: {
    app: 'Retro',
    language_en: 'English',
    language_es: 'Español',
  },
  home: {
    menu_label: 'Home',
    presentation: {
      title: 'Bienvenido a Retro',
      text: 'Retro es una aplicación para hacer retrospectivas de manera compartida entre miembros de un equipo.',
    },
    disclaimer: {
      title: 'Descarga de responsabilidad',
      text1:
        'El objetivo de esta aplicación es servir de ejemplo para un proyecto Vue Enterprise, los datos se almacenan en mi cuenta de Firebase, por lo que no se recomienda utilizar esta URL para incluir información privada.',
      text2:
        'Si te gusta la aplicación y quieres utilizarla de forma segura en tu organización, puedes',
      text3: 'descargar el proyecto',
      text4:
        ', crear tu propia cuenta de Firebase o algún servicio similar y ejecutarla.',
    },
    join_session: {
      title: 'Acceder a una sesión',
      text: 'Para acceder a una sesión existente, por favor, pegue el código de sesión y escriba su nombre.',
    },
    create_session: {
      title: 'Crear una nueva sesión',
      text1: 'Para crear una nueva sesión debes estar registrado.',
      text2: 'Haz click en',
      text3: 'si ya estás registrado, o en',
      text4: 'para crear una nueva cuenta.',
    },
    about: {
      title: 'Sobre Retro',
    },
    salutation: '¡Esperamos que disfrutes!',
  },
  auth: {
    login: {
      menu_label: 'Login',
      title: 'Login',
      new_to_service: '¿Aún no tienes una cuenta?',
    },
    signup: {
      menu_label: 'SignUp',
      title: 'Signup',
      already_registered: '¿Ya estás registrado?',
    },
    logout: {
      menu_label: 'Logout',
      title: 'Logout',
    },
    form: {
      name: 'Nombre:',
      email: 'Email:',
      password: 'Contraseña:',
      confirm_password: 'Repetir contraseña:',
      submit: 'Enviar',
    },
  },
  retro: {
    titles: {
      continue: 'Cosas que deberíamos continuar haciendo...',
      stop: 'Cosas que habría que dejar de hacer...',
      try: 'Nuevas cosas que podríamos intentar hacer...',
      kudos: 'Agradecimientos...',
    },
    input: {
      placeholder: 'Escribe aquí...',
    },
    add_button: 'Añadir',
    loading: 'Cargando datos...',
    session: {
      title: 'Acceder a sesión',
      code: 'Código de sesión:',
      code_placeholder: 'Pega aquí el código de sesión',
      create_code_placeholder: 'Escribe aquí el nuevo código de sesión',
      name: 'Nombre:',
      name_placeholder: 'Escribe tu nombre',
      join_session_btn: 'Acceder a la sesión',
      create_session_btn: 'Crear nueva sesión',
    },
    controls: {
      title: 'Controles',
      change_name: 'Cambia tu nombre:',
      name_changed_to: 'Tu nuevo nombre es:',
      apply_btn: 'Aplicar',
      delete_session: {
        button: 'Borrar sesión',
        confirmation_message_0:
          '¿Estás seguro de que quieres borrar la sesión?',
        confirmation_message_1:
          'Borrará todos los mensajes para todos los participantes.',
        yes: 'Sí',
        no: 'No',
      },
      advanced_controls: {
        show: 'Mostrar',
        hide: 'Ocultar',
        ticks: 'marcadores',
      },
    },
  },
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
  },
};
