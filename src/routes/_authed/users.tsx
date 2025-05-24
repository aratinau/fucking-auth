import {createFileRoute} from '@tanstack/react-router'
import UserList from "@/components/UserList.tsx";

export const Route = createFileRoute('/_authed/users')({
  component: UserList,
})
