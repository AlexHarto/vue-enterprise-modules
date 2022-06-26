export const isTruthy = (
  val: string | boolean | undefined
): undefined | true => {
  if (val === undefined || val === false || val === 'false') return undefined;
  return true;
};

export const isFalsy = (val: string | boolean | undefined): boolean => {
  if (val === undefined || val === false || val === 'false') return true;
  return false;
};
