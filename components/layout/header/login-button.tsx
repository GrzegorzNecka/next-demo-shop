import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginButton = () => {
  const session = useSession();

  const router = useRouter();
  // console.log(session.status);

  switch (session.status) {
    case 'authenticated':
      return (
        <button className="text-left" type="button" onClick={() => signOut()}>
          <div className="text-s font-semibold">wyloguj</div>
          <div className="text-xs "> {`${session.data.user.email}`}</div>
        </button>
      );

    case 'unauthenticated':
    default:
      return (
        <>
          <button className="" type="button" onClick={() => signIn()}>
            zaloguj
          </button>
          <span className="mx-2">/</span>
          <button type="button" onClick={() => router.push('/signup')}>
            zarejestruj
          </button>
        </>
      );
  }
};

export default LoginButton;
