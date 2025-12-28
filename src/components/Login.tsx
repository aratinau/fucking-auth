import {useRouter} from '@tanstack/react-router'
import {Auth} from './Auth'
import {useMutation} from '@tanstack/react-query';
import {authUtils} from "@/utils/auth.ts";


export function Login() {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: async ({data}) => {
      const {email, password} = data

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login_check`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      })

      if (!res.ok) throw new Error('Login invalide')

      return res.json()
    },
    onSuccess: async (ctx) => {

      authUtils.setAuthData('auth_token', ctx.token)
      authUtils.setAuthData('refresh_token', ctx.refresh_token)
      authUtils.setAuthData('user_data', ctx)
      authUtils.setAuthData('is_authenticated', 'true')

      // Rediriger vers la page d'accueil ou dashboard après connexion
      router.navigate({to: '/'}); // ou '/dashboard'
    },
    onError: (error) => {
      console.error('Erreur de connexion:', error);
    }
  });

  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement)
        console.log(formData)

        loginMutation.mutate({
          data: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          },
        })
      }}
      /*
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
            {loginMutation.data.userNotFound ? (
              <div>
                <button
                  className="text-blue-500"
                  onClick={(e) => {
                    const formData = new FormData(
                      (e.target as HTMLButtonElement).form!,
                    )

              console.log("ok")
            }}
            type="button"
          >
            Sign up instead?
          </button>
        </div>
      ) : null}
    </>
  ) : null
}*/
    />
  )
}
