import { authUtils } from '@/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

const logoutFn = () => {

  authUtils.logout()

  throw redirect({
    href: '/',
  })
}

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: () => logoutFn(),
})
