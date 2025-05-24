import { createFileRoute } from '@tanstack/react-router'
import {Login} from "@/components/Login.tsx";
import {authUtils} from "@/utils/auth.ts";


export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    // if (!context.user) {
    if (!authUtils.isAuthenticated()) {
      throw new Error('Not authenticated')
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return <Login />
    }

    throw error
  },
})
