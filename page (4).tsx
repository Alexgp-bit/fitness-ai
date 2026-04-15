import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  if (isLoggedIn()) redirect('/');
  return (
    <main className="mx-auto min-h-screen max-w-5xl p-4 sm:p-6 lg:p-8">
      <LoginForm />
    </main>
  );
}
