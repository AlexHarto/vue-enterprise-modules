import { auth } from '@/infra/firebase/config';
import { isUser } from '@/modules/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth';
import { ref } from 'vue';

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (_user) => {
  console.log('User state changed. Current is user is:', _user);
  user.value = _user;
  // Change menu items according to the user value
  // and returns if we have a user (boolean)
  isUser();
});

const useAuth = () => {
  const error = ref<string | null>(null);
  const isPending = ref(false);

  const updateUserName = async (displayName: string) => {
    if (user.value && user.value.displayName !== displayName) {
      await updateProfile(user.value, { displayName });
    }
  };

  const signup = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error('Could not complete signup');
      }
      await updateUserName(displayName);
      error.value = null;
      isPending.value = false;
    } catch (catchError) {
      const err = catchError as Error;
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error('Could not login');
      }
      error.value = null;
      isPending.value = false;
    } catch (catchError) {
      const err = catchError as Error;
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, error, isPending, signup, login, logout, updateUserName };
};

export default useAuth;
