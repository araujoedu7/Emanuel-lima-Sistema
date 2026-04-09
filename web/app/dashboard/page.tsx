'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('usuário');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedName = localStorage.getItem('user_name');
    const savedEmail = localStorage.getItem('user_email');

    if (!token) {
      router.push('/');
      return;
    }

    if (savedName && savedName.trim()) {
      setUserName(savedName);
      return;
    }

    if (savedEmail && savedEmail.trim()) {
      setUserName(savedEmail);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    router.push('/');
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <header
        className="border-b"
        style={{
          backgroundColor: 'var(--color-primary)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              Sistema jurídico interno
            </p>
            <h1
              className="mt-2 text-2xl font-semibold"
              style={{ color: 'var(--color-white)' }}
            >
              Olá, seja bem-vindo, {userName}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border px-4 py-2.5 text-sm font-semibold transition"
            style={{
              borderColor: 'rgba(255,255,255,0.16)',
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: 'var(--color-white)',
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 xl:grid-cols-[1.65fr_0.95fr]">
          <div className="space-y-6">
            <div
              className="relative overflow-hidden rounded-[28px] border p-8 shadow-[0_20px_50px_rgba(15,42,68,0.10)]"
              style={{
                borderColor: 'rgba(15,42,68,0.08)',
                background:
                  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              }}
            >
              <div
                className="absolute right-[-60px] top-[-50px] h-40 w-40 rounded-full"
                style={{
                  backgroundColor: 'rgba(230, 200, 120, 0.16)',
                  filter: 'blur(18px)',
                }}
              />
              <div
                className="absolute bottom-[-70px] left-[-40px] h-44 w-44 rounded-full"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  filter: 'blur(18px)',
                }}
              />

              <div className="relative z-10 max-w-3xl">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--color-accent-light)' }}
                >
                  Painel principal
                </p>

                <h2
                  className="mt-4 text-3xl font-semibold leading-tight"
                  style={{ color: 'var(--color-white)' }}
                >
                  Central de operação do sistema interno do escritório
                </h2>

                <p
                  className="mt-4 max-w-2xl text-sm leading-7"
                  style={{ color: 'rgba(255,255,255,0.78)' }}
                >
                  A partir daqui você acessa clientes, atendimentos, documentos,
                  usuários e os próximos módulos operacionais do sistema.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Link
                href="/clients"
                className="group rounded-[24px] border p-6 shadow-[0_14px_34px_rgba(15,42,68,0.06)] transition hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-white)',
                }}
              >
                <div
                  className="inline-flex rounded-2xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{
                    backgroundColor: 'rgba(15,42,68,0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Clientes
                </div>

                <h3
                  className="mt-5 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Cadastro e dossiê do cliente
                </h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Consulte clientes cadastrados, acesse dados principais e siga
                  para o histórico individual de cada dossiê.
                </p>

                <span
                  className="mt-6 inline-block text-sm font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Acessar módulo
                </span>
              </Link>

              <Link
                href="/cases"
                className="group rounded-[24px] border p-6 shadow-[0_14px_34px_rgba(15,42,68,0.06)] transition hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-white)',
                }}
              >
                <div
                  className="inline-flex rounded-2xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{
                    backgroundColor: 'rgba(15,42,68,0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Atendimentos
                </div>

                <h3
                  className="mt-5 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Gestão de casos e atendimentos
                </h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Abra novos atendimentos, acompanhe casos existentes e organize
                  o fluxo jurídico por cliente.
                </p>

                <span
                  className="mt-6 inline-block text-sm font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Acessar módulo
                </span>
              </Link>

              <Link
                href="/documents"
                className="group rounded-[24px] border p-6 shadow-[0_14px_34px_rgba(15,42,68,0.06)] transition hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-white)',
                }}
              >
                <div
                  className="inline-flex rounded-2xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{
                    backgroundColor: 'rgba(15,42,68,0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Documentos
                </div>

                <h3
                  className="mt-5 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Geração e revisão documental
                </h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Emissão padronizada, revisão final, edição de conteúdo e
                  controle de versões dos documentos do escritório.
                </p>

                <span
                  className="mt-6 inline-block text-sm font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Acessar módulo
                </span>
              </Link>

              <Link
                href="/users"
                className="group rounded-[24px] border p-6 shadow-[0_14px_34px_rgba(15,42,68,0.06)] transition hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-white)',
                }}
              >
                <div
                  className="inline-flex rounded-2xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{
                    backgroundColor: 'rgba(15,42,68,0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Usuários
                </div>

                <h3
                  className="mt-5 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Controle de acesso do sistema
                </h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Administração de perfis, permissões e gerenciamento dos
                  usuários internos do escritório.
                </p>

                <span
                  className="mt-6 inline-block text-sm font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Acessar módulo
                </span>
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div
              className="rounded-[28px] border p-6 shadow-[0_16px_40px_rgba(15,42,68,0.08)]"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-white)',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-accent)' }}
              >
                Visão geral
              </p>

              <h2
                className="mt-3 text-xl font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                Resumo operacional
              </h2>

              <div className="mt-6 space-y-4">
                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Clientes
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    --
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Total cadastrado
                  </p>
                </div>

                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Atendimentos
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    --
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Em acompanhamento
                  </p>
                </div>

                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Documentos
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    --
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Gerados no sistema
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-[28px] border p-6 shadow-[0_16px_40px_rgba(15,42,68,0.08)]"
              style={{
                borderColor: 'rgba(201,164,76,0.22)',
                backgroundColor: 'rgba(201,164,76,0.10)',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-primary)' }}
              >
                Próxima frente
              </p>

              <h2
                className="mt-3 text-xl font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                Evolução natural do front
              </h2>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: 'var(--color-primary-light)' }}
              >
                Os próximos módulos mais naturais são listagem de clientes,
                cadastro de cliente e abertura de atendimentos com base no fluxo
                já definido do sistema.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}