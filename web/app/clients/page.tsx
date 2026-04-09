'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Client = {
  id: string;
  fullName: string;
  cpf: string;
  rg?: string | null;
  email?: string | null;
  phone?: string | null;
  profession?: string | null;
  maritalStatus?: string | null;
  zipCode?: string | null;
  street?: string | null;
  number?: string | null;
  complement?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default function ClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/');
      return;
    }

    async function loadClients() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch('http://localhost:3000/clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => []);

        if (response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_email');
          localStorage.removeItem('user_name');
          router.push('/');
          return;
        }

        if (!response.ok) {
          const backendMessage =
            data?.message && typeof data.message === 'string'
              ? data.message
              : 'Não foi possível carregar os clientes.';

          throw new Error(backendMessage);
        }

        if (!Array.isArray(data)) {
          throw new Error('Resposta inválida ao carregar clientes.');
        }

        setClients(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar os clientes.';

        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadClients();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    router.push('/');
  }

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return clients;
    }

    return clients.filter((client) => {
      const fullName = client.fullName?.toLowerCase() || '';
      const cpf = client.cpf?.toLowerCase() || '';
      const email = client.email?.toLowerCase() || '';

      return (
        fullName.includes(normalizedSearch) ||
        cpf.includes(normalizedSearch) ||
        email.includes(normalizedSearch)
      );
    });
  }, [clients, search]);

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
              Clientes
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-2xl border px-4 py-2.5 text-sm font-semibold transition"
              style={{
                borderColor: 'rgba(255,255,255,0.16)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: 'var(--color-white)',
              }}
            >
              Voltar
            </Link>

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
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
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

              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: 'var(--color-accent-light)' }}
                  >
                    Gestão de clientes
                  </p>

                  <h2
                    className="mt-4 text-3xl font-semibold leading-tight"
                    style={{ color: 'var(--color-white)' }}
                  >
                    Cadastro central do escritório
                  </h2>

                  <p
                    className="mt-4 text-sm leading-7"
                    style={{ color: 'rgba(255,255,255,0.78)' }}
                  >
                    Consulte clientes cadastrados, localize rapidamente por nome,
                    CPF ou e-mail e siga para as próximas etapas do fluxo do
                    sistema.
                  </p>
                </div>

                <Link
                  href="/clients/new"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    boxShadow: '0 18px 36px rgba(201, 164, 76, 0.28)',
                  }}
                >
                  Novo cliente
                </Link>
              </div>
            </div>

            <div
              className="rounded-[28px] border p-6 shadow-[0_16px_40px_rgba(15,42,68,0.08)]"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-white)',
              }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Base cadastrada
                  </p>
                  <h3
                    className="mt-3 text-xl font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Lista de clientes
                  </h3>
                </div>

                <div className="w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Buscar por nome, CPF ou e-mail"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-text)',
                    }}
                  />
                </div>
              </div>

              {isLoading ? (
                <div
                  className="mt-6 rounded-2xl border px-5 py-10 text-center text-sm"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text-light)',
                  }}
                >
                  Carregando clientes...
                </div>
              ) : null}

              {!isLoading && errorMessage ? (
                <div
                  className="mt-6 rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: 'rgba(201, 164, 76, 0.30)',
                    backgroundColor: 'rgba(201, 164, 76, 0.10)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {errorMessage}
                </div>
              ) : null}

              {!isLoading && !errorMessage ? (
                <div
                  className="mt-6 overflow-hidden rounded-[28px] border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="grid grid-cols-[minmax(280px,1.5fr)_170px_170px_180px] gap-4 border-b px-6 py-4"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-primary)',
                    }}
                  >
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,0.82)' }}
                    >
                      Cliente
                    </div>
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,0.82)' }}
                    >
                      CPF
                    </div>
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,0.82)' }}
                    >
                      Telefone
                    </div>
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,0.82)' }}
                    >
                      Localização
                    </div>
                  </div>

                  {filteredClients.length === 0 ? (
                    <div
                      className="px-6 py-12 text-center text-sm"
                      style={{
                        backgroundColor: 'var(--color-white)',
                        color: 'var(--color-text-light)',
                      }}
                    >
                      Nenhum cliente encontrado.
                    </div>
                  ) : (
                    <div>
                      {filteredClients.map((client, index) => (
                        <div
                          key={client.id}
                          className="grid grid-cols-[minmax(280px,1.5fr)_170px_170px_180px] gap-4 px-6 py-5"
                          style={{
                            backgroundColor:
                              index % 2 === 0
                                ? 'var(--color-white)'
                                : '#FBFCFD',
                            borderTop:
                              index === 0
                                ? 'none'
                                : '1px solid var(--color-border)',
                          }}
                        >
                          <div className="min-w-0">
                            <p
                              className="truncate text-[15px] font-semibold"
                              style={{ color: 'var(--color-primary)' }}
                            >
                              {client.fullName}
                            </p>
                            <p
                              className="mt-1 truncate text-sm"
                              style={{ color: 'var(--color-text-light)' }}
                            >
                              {client.email || 'E-mail não informado'}
                            </p>
                          </div>

                          <div className="flex items-start">
                            <span
                              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                              style={{
                                backgroundColor: 'rgba(15,42,68,0.08)',
                                color: 'var(--color-primary)',
                              }}
                            >
                              {client.cpf}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <p
                              className="text-sm font-medium"
                              style={{ color: 'var(--color-text)' }}
                            >
                              {client.phone || '-'}
                            </p>
                            <p
                              className="mt-1 text-xs"
                              style={{ color: 'var(--color-text-light)' }}
                            >
                              {client.profession || 'Profissão não informada'}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p
                              className="text-sm font-medium"
                              style={{ color: 'var(--color-text)' }}
                            >
                              {client.city || '-'}
                              {client.state ? `, ${client.state}` : ''}
                            </p>
                            <p
                              className="mt-1 truncate text-xs"
                              style={{ color: 'var(--color-text-light)' }}
                            >
                              {client.neighborhood || 'Bairro não informado'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
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
                Resumo
              </p>

              <h2
                className="mt-3 text-xl font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                Visão rápida
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
                    Total exibido
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {filteredClients.length}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Clientes na listagem atual
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
                    Busca
                  </p>
                  <p
                    className="mt-2 text-lg font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {search.trim() ? 'Filtro ativo' : 'Sem filtro'}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Nome, CPF ou e-mail
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
                Próxima etapa
              </p>

              <h2
                className="mt-3 text-xl font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                Cadastro de cliente
              </h2>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: 'var(--color-primary-light)' }}
              >
                Depois desta listagem, o próximo passo natural é construir a tela
                de criação de cliente para fechar o primeiro fluxo completo do
                módulo.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}