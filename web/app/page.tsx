'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginResponse = {
  access_token?: string;
  message?: string | string[];
};

type JwtPayload = {
  sub?: string;
  email?: string;
  name?: string;
  role?: string;
  iat?: number;
  exp?: number;
};

function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];

    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );
    const jsonPayload = atob(paddedBase64);
    const decoded = decodeURIComponent(
      Array.from(jsonPayload)
        .map(
          (char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`,
        )
        .join(''),
    );

    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        email: email.trim(),
        password,
      };

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: LoginResponse = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (typeof data.message === 'string') {
          throw new Error(data.message);
        }

        if (Array.isArray(data.message)) {
          throw new Error(data.message.join(', '));
        }

        throw new Error('E-mail ou senha inválidos.');
      }

      if (!data.access_token) {
        throw new Error('Token não retornado pelo backend.');
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_email', email.trim());

      const jwtPayload = parseJwt(data.access_token);

      if (jwtPayload?.name) {
        localStorage.setItem('user_name', jwtPayload.name);
      } else {
        localStorage.setItem('user_name', email.trim());
      }

      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Não foi possível realizar o login.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, rgba(15, 42, 68, 0.16), transparent 28%),
            radial-gradient(circle at 85% 20%, rgba(201, 164, 76, 0.14), transparent 20%),
            radial-gradient(circle at 78% 78%, rgba(30, 74, 115, 0.12), transparent 24%),
            linear-gradient(135deg, rgba(15, 42, 68, 0.03) 0%, rgba(247, 249, 251, 0) 45%)
          `,
        }}
      />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-white)] shadow-[0_30px_100px_rgba(15,42,68,0.18)] lg:grid-cols-[1.15fr_0.85fr]">
        <section
          className="relative hidden min-h-[720px] overflow-hidden lg:flex"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 22%),
                radial-gradient(circle at 80% 28%, rgba(230, 200, 120, 0.22), transparent 18%),
                radial-gradient(circle at 72% 78%, rgba(255,255,255,0.07), transparent 24%),
                linear-gradient(160deg, rgba(15,42,68,0.98) 0%, rgba(15,42,68,0.92) 52%, rgba(30,74,115,0.94) 100%)
              `,
            }}
          />

          <div
            className="absolute -right-24 top-24 h-72 w-72 rounded-full"
            style={{ backgroundColor: 'rgba(201, 164, 76, 0.12)', filter: 'blur(24px)' }}
          />

          <div
            className="absolute left-[-80px] bottom-[-80px] h-72 w-72 rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', filter: 'blur(28px)' }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-14">
            <div className="flex items-center gap-3">
              <div
                className="h-11 w-11 rounded-2xl border"
                style={{
                  borderColor: 'rgba(255,255,255,0.18)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                }}
              />
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(255,255,255,0.68)' }}
                >
                  Sistema jurídico
                </p>
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'rgba(255,255,255,0.88)' }}
                >
                  Ambiente interno do escritório
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <div
                className="mb-6 inline-flex rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{
                  borderColor: 'rgba(230, 200, 120, 0.28)',
                  backgroundColor: 'rgba(201, 164, 76, 0.12)',
                  color: 'var(--color-accent-light)',
                }}
              >
                Plataforma interna
              </div>

              <h1
                className="text-5xl font-semibold leading-[1.08]"
                style={{ color: 'var(--color-white)' }}
              >
                Operação jurídica com padrão visual, controle e segurança.
              </h1>

              <p
                className="mt-6 max-w-lg text-base leading-8"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                Centralize clientes, atendimentos, documentos e histórico do
                escritório em um ambiente único, consistente e profissional.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-4">
              <div
                className="rounded-2xl border p-4 backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(255,255,255,0.14)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: 'rgba(255,255,255,0.56)' }}
                >
                  Clientes
                </p>
                <p
                  className="mt-2 text-lg font-semibold"
                  style={{ color: 'var(--color-white)' }}
                >
                  Cadastro central
                </p>
              </div>

              <div
                className="rounded-2xl border p-4 backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(255,255,255,0.14)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: 'rgba(255,255,255,0.56)' }}
                >
                  Casos
                </p>
                <p
                  className="mt-2 text-lg font-semibold"
                  style={{ color: 'var(--color-white)' }}
                >
                  Fluxo organizado
                </p>
              </div>

              <div
                className="rounded-2xl border p-4 backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(255,255,255,0.14)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: 'rgba(255,255,255,0.56)' }}
                >
                  Documentos
                </p>
                <p
                  className="mt-2 text-lg font-semibold"
                  style={{ color: 'var(--color-white)' }}
                >
                  Geração padronizada
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[720px] items-center justify-center px-8 py-12 sm:px-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <p
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-accent)' }}
              >
                Acesso restrito
              </p>

              <h2
                className="mt-4 text-4xl font-semibold leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                Entrar no sistema
              </h2>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: 'var(--color-text-light)' }}
              >
                Informe suas credenciais para acessar o ambiente interno do
                escritório.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-sm font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-2xl border px-4 py-4 text-sm outline-none transition"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text)',
                    boxShadow: 'inset 0 1px 2px rgba(15, 42, 68, 0.03)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-3 block text-sm font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Senha
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-2xl border px-4 py-4 text-sm outline-none transition"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text)',
                    boxShadow: 'inset 0 1px 2px rgba(15, 42, 68, 0.03)',
                  }}
                />
              </div>

              {errorMessage ? (
                <div
                  className="rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: 'rgba(201, 164, 76, 0.30)',
                    backgroundColor: 'rgba(201, 164, 76, 0.10)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl px-4 py-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  boxShadow: '0 18px 36px rgba(201, 164, 76, 0.28)',
                }}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}