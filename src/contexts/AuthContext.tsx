import React, { createContext, useState } from "react";
import Router from 'next/router'

import { destroyCookie, setCookie } from "nookies";

import { signInRequest } from "../services/auth";
import { api } from "../services/api";

type UserType = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType;
  signIn: (data: SignInData) => Promise<void>;
  signOut: any;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<UserType | null>(null)

  const isAuthenticated = !!user

  function signOut() {
    destroyCookie(null, 'user-client_id')
    destroyCookie(null, 'user-name')
    destroyCookie(null, 'user-role')
    destroyCookie(null, 'user-id')
    destroyCookie(null, '@smartAuth-token')
  }

  async function signIn({email, password}: SignInData) {
    await signOut()

    const { token, user, exception }: any = await signInRequest({
      email,
      password
    })

    if (token)
      setCookie(undefined, '@smartAuth-token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

    if (user.role)
      setCookie(undefined, 'user-role', user.role)

    if (user.id)
      setCookie(undefined, 'user-id', user.id)

    if (user.name)
      setCookie(undefined, 'user-name', user.name)

    if (user.client_id)
      setCookie(undefined, 'user-client_id', user.client_id)

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    if (!exception) {
      if (user.role == 2) {
        Router.push('/dashboard')
      } else {
        Router.push('administrative/clients')
      }
      return;
    } else {
      return exception
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
