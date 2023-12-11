import React, { useState } from 'react';
import Layout from '../components/Layout';
import GoogleButton from '../components/GoogleButton';
import { useRouter } from 'next/navigation';
import type { FormEventHandler } from 'react';
import Link from 'next/link';
import Toast, { IToast, ToastType } from '../components/Toast';
import { IUser, loginUser } from '../api/auth';
import { setCookie } from 'nookies';

const SignIn: React.FC = () => {
  const [toast, setToast] = useState<IToast>({ message: '' });

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const userData: Omit<IUser, 'id'> = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      const accessToken = await loginUser(userData);
      setCookie(null, 'accessToken', accessToken, { maxAge: 86400, path: '/' });
      router.push('/');
    } catch (err) {
      showToast({ type: ToastType.Error, message: (err as Error).message });
      console.error(err);
    }
  };

  const showToast = ({ type, message }: IToast) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast({ message: '' });
    }, 3000);
  };

  return (
    <Layout>
      <div
        className="flex justify-center items-center"
        style={{ minHeight: 'calc(100vh - 260px)' }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs p-5 rounded-lg shadow-lg"
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </label>
          <button className="btn btn-neutral w-full mt-5" type="submit">
            Sign In
          </button>
          <div className="text-center my-4">or</div>
          <GoogleButton />
          <div className="text-center mt-4 text-accent-focus hover:underline">
            <Link href="/signup">Don't have an account?</Link>
          </div>
        </form>
      </div>

      {toast.message && <Toast type={toast.type} message={toast.message} />}
    </Layout>
  );
};

export default SignIn;
