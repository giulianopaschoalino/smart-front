import React, { createContext, useState } from "react";
import Router from 'next/router'

import { setCookie } from "nookies";

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
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<UserType | null>(null)

  const isAuthenticated = !!user

  async function signIn({email, password}: SignInData) {
    const { token, user, exception }: any = await signInRequest({
      email,
      password
    })

    if (token) {
      setCookie(undefined, '@smartAuth-token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })
    }

    if (user.role) {
      setCookie(undefined, 'user-role', user.role)
    }

    if (!exception) {
      if (user.role == 2) {
        Router.push('/dashboard')
      } else {
        Router.push('administrative/clients')
      }
      return;
    } else {
      return
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
