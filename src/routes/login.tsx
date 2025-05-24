import { createFileRoute } from '@tanstack/react-router'
import {Login} from "@/components/Login.tsx";

export const Route = createFileRoute('/login')({
  component: LoginComp,
})

function LoginComp() {
  return <Login />
}
