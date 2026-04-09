'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ClientFormData = {
  fullName: string;
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  profession: string;
  maritalStatus: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

const initialFormData: ClientFormData = {
  fullName: '',
  cpf: '',
  rg: '',
  email: '',
  phone: '',
  profession: '',
  maritalStatus: '',
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

export default function NewClientPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/');
    }
  }, [router]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          cpf: formData.cpf.trim(),
          rg: formData.rg.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          profession: formData.profession.trim(),
          maritalStatus: formData.maritalStatus.trim(),
          zipCode: formData.zipCode.trim(),
          street: formData.street.trim(),
          number: formData.number.trim(),
          complement: formData.complement.trim(),
          neighborhood: formData.neighborhood.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        router.push('/');
        return;
      }

      if (!response.ok) {
        if (typeof data?.message === 'string') {
          throw new Error(data.message);
        }

        if (Array.isArray(data?.message)) {
          throw new Error(data.message.join(', '));
        }

        throw new Error('Não foi possível cadastrar o cliente.');
      }

      router.push('/clients');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Não foi possível cadastrar o cliente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    router.push('/');
  }

  function renderInput(
    label: string,
    name: keyof ClientFormData,
    placeholder: string,
    required = false,
    type: 'text' | 'email' = 'text',
  ) {
    return (
      <div>
        <label
          htmlFor={name}
          className="mb-3 block text-sm font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          {label}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)',
          }}
        />
      </div>
    );
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
              Novo cliente
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/clients"
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

              <div className="relative z-10 max-w-2xl">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--color-accent-light)' }}
                >
                  Cadastro de cliente
                </p>

                <h2
                  className="mt-4 text-3xl font-semibold leading-tight"
                  style={{ color: 'var(--color-white)' }}
                >
                  Inclusão de novo cliente no sistema
                </h2>

                <p
                  className="mt-4 text-sm leading-7"
                  style={{ color: 'rgba(255,255,255,0.78)' }}
                >
                  Preencha os dados cadastrais e o endereço principal do cliente
                  para reutilização futura em atendimentos e documentos.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border p-6 shadow-[0_16px_40px_rgba(15,42,68,0.08)]"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-white)',
              }}
            >
              <div className="mb-8">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Dados cadastrais
                </p>
                <h3
                  className="mt-3 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Informações principais do cliente
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  {renderInput(
                    'Nome completo',
                    'fullName',
                    'Digite o nome completo do cliente',
                    true,
                  )}
                </div>

                {renderInput('CPF', 'cpf', 'Digite o CPF', true)}
                {renderInput('RG', 'rg', 'Digite o RG', true)}
                {renderInput('E-mail', 'email', 'Digite o e-mail', false, 'email')}
                {renderInput('Telefone', 'phone', 'Digite o telefone', true)}
                {renderInput('Profissão', 'profession', 'Digite a profissão', true)}

                <div>
                  <label
                    htmlFor="maritalStatus"
                    className="mb-3 block text-sm font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Estado civil
                  </label>

                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-text)',
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                    <option value="União estável">União estável</option>
                  </select>
                </div>
              </div>

              <div className="mb-8 mt-10">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Endereço
                </p>
                <h3
                  className="mt-3 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Dados de localização
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {renderInput('CEP', 'zipCode', 'Digite o CEP', true)}
                {renderInput('Rua', 'street', 'Digite a rua', true)}
                {renderInput('Número', 'number', 'Digite o número', true)}
                {renderInput('Complemento', 'complement', 'Digite o complemento')}
                {renderInput('Bairro', 'neighborhood', 'Digite o bairro', true)}
                {renderInput('Cidade', 'city', 'Digite a cidade', true)}
                {renderInput('Estado', 'state', 'Digite o estado', true)}
              </div>

              {errorMessage ? (
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/clients"
                  className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold transition"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    boxShadow: '0 18px 36px rgba(201, 164, 76, 0.28)',
                  }}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar cliente'}
                </button>
              </div>
            </form>
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
                Orientação
              </p>

              <h2
                className="mt-3 text-xl font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                Preenchimento base
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7" style={{ color: 'var(--color-text-light)' }}>
                <p>
                  Os dados cadastrados aqui serão a base de reaproveitamento para
                  atendimentos, snapshots e futura geração de documentos.
                </p>
                <p>
                  Preencha com atenção especialmente os campos de nome completo,
                  CPF, endereço e estado civil.
                </p>
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
                Dossiê e atendimento
              </h2>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: 'var(--color-primary-light)' }}
              >
                Depois do cadastro do cliente, o fluxo natural segue para a
                listagem, dossiê individual e abertura de novo atendimento.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}