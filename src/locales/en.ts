export default {
  header: {
    app: 'Retro',
    language: 'Language',
    language_en: 'English',
    language_es: 'Español',
  },
  home: {
    menu_label: 'Home',
    presentation: {
      title: 'Welcome to Retro',
      text: 'Retro is an application to make retrospectives.',
    },
    disclaimer: {
      title: 'Disclaimer',
      text1:
        'The purpose of this application is to serve as an example for a Vue Enterprise project, the data is stored in my Firebase account, so it is not recommended to use this URL to include private information.',
      text2:
        'If you like the application and you want to use it securely in your organization, you can',
      text3: 'download the project',
      text4:
        ', create your own Firebase account or a similar service and run it.',
    },
    join_session: {
      title: 'Join session',
      text: 'To join an existing session, please paste the session code and type your name.',
    },
    create_session: {
      title: 'Create new session',
      text1: 'You need an account to create a new session.',
      text2: 'Click on',
      text3: 'if you are already registered, or',
      text4: 'if you want to create a new account.',
    },
    about: {
      title: 'About Retro',
    },
    salutation: 'Enjoy our application!',
  },
  auth: {
    login: {
      menu_label: 'Login',
      title: 'Login',
      new_to_service: 'New to this service?',
    },
    signup: {
      menu_label: 'SignUp',
      title: 'Signup',
      already_registered: 'Already registered?',
    },
    logout: {
      menu_label: 'Logout',
      title: 'Logout',
    },
    form: {
      name: 'Name:',
      email: 'Email:',
      password: 'Password:',
      confirm_password: 'Confirm password:',
      submit: 'Submit',
    },
  },
  retro: {
    titles: {
      continue: 'Things we should continue doing...',
      stop: 'Things we should stop doing...',
      try: 'New things we could try...',
      kudos: 'Kudos...',
    },
    input: {
      placeholder: 'Type something here...',
    },
    add_button: 'Add',
    loading: 'Loading data...',
    join_session: {
      title: 'Join session',
      code: 'Session code',
      code_placeholder: 'Paste the session code here',
      code_error: 'The session code cannot be empty.',
      name: 'Your name',
      name_placeholder: 'Type your name',
      name_error: 'Your name cannot be empty.',
      submit: 'Join session',
    },
  },
  notifications: {
    notification1: {
      title: 'Congratulations!',
      message1: 'You made it!',
      message2: 'Enjoy our service!',
    },
    notification2: {
      title: 'Hi!',
      message: 'Welcome back to our service!',
    },
  },
  errors: {
    generic: 'Something wrong happened.Please, try again later.',
  },
};
