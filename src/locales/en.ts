export default {
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
    required: 'This field is required.',
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
    'auth/invalid-password':
      'Invalid password. Please, try again or Signup with another email.',
  },
  aria: {
    icon: 'Icon',
  },
};
