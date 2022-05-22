export default {
  header: {
    app: 'Retro',
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
    session: {
      title: 'Join session',
      code: 'Session code:',
      code_placeholder: 'Paste the session code here',
      create_code_placeholder: 'Type the new session code here',
      code_error: 'The session code cannot be empty.',
      name: 'Your name:',
      name_placeholder: 'Type your name',
      name_error: 'Your name cannot be empty.',
      join_session_btn: 'Join session',
      create_session_btn: 'Create new session',
    },
    controls: {
      title: 'Controls',
      change_name: 'Change your name:',
      name_changed_to: 'Your new name is:',
      apply_btn: 'Apply',
      delete_session: {
        button: 'Delete session',
        confirmation_message_0: 'Are you sure you want to delete the session?',
        confirmation_message_1:
          'It will delete all the messages for all participants.',
        yes: 'Yes',
        no: 'No',
      },
      advanced_controls: {
        show: 'Show',
        hide: 'Hide',
        ticks: 'ticks',
      },
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
    generic: 'Something wrong happened. Please, try again later.',
    password_confirmation_doesnt_match:
      "Password confirmation doesn't match. Please, verify your password and try again.",
    'auth/email-already-in-use':
      'The email is already registered. Please, login or try another email.',
    'auth/invalid-email':
      'Invalid email. Please, check your email and try again.',
    'auth/operation-not-allowed': 'Operation not allowed.',
    'auth/weak-password':
      'The password is not strong enough. Please, use a stronger password with at least a 6 characters.',
    'auth/user-not-found':
      'We cannot find your email in our records. Please, verify your email and try again or Signup.',
  },
};
