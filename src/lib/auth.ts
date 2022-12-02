
// src/lib/auth.ts
import { Magic } from 'magic-sdk';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import {
  registerUser,
} from '../api';
let magic;
export const store = writable({
  loading: false,
  user: null,
  token: null,
});

function createMagic() {
  magic = magic || new Magic(import.meta.env.VITE_MAGIC_PUBLIC_KEY as string);
  return magic;
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout');
  store.set({
		loading: false,
		user: null
	});
  goto('/auth');
}

export async function login(email: string): Promise<void> {
  const magic = createMagic();
  const didToken = await magic.auth.loginWithMagicLink({ email });

  localStorage.setItem('didToken', didToken)

  // register user to backend
  await register(didToken);
  // end
  // Validate the did token on the server
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    store.set({
      loading: false,
      user: data.user
    });
  }
}

async function register(token) {
  return await registerUser(token);
}