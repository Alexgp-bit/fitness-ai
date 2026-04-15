'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error || 'No se pudo iniciar sesión.');
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card mx-auto mt-16 w-full max-w-md p-6">
      <div className="label">Acceso privado</div>
      <h1 className="mt-2 text-2xl font-semibold text-white">Entra en tu panel</h1>
      <p className="mt-2 text-sm text-slate-400">
        Esta versión está pensada para un uso personal de una sola cuenta.
      </p>
      <div className="mt-6">
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? <div className="mt-3 text-sm text-rose-400">{error}</div> : null}
      <button type="submit" className="button-primary mt-4 w-full" disabled={loading}>
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
