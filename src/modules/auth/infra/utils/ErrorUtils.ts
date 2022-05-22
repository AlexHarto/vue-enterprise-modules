export const errorCodes = [
  'auth/email-already-in-use',
  'auth/invalid-email',
  'auth/operation-not-allowed',
  'auth/weak-password',
  'auth/user-not-found',
];

export const getError = (errorCode: string | null | undefined) => {
  if (errorCode) {
    if (errorCodes.indexOf(errorCode) > -1) {
      return errorCode;
    }
    return 'generic';
  }
  return '';
};
