import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')
  return (
  <>
    <AuthForm mode="sign-up" />
    <div style={{marginTop: '20px', textAlign: 'center'}}>
      <a
        href="https://buy.stripe.com/14A5kDbW1ct16bV6ot7bw00"
        target="_blank"
        style={{background:'#000',color:'#fff',padding:'14px 28px',borderRadius:'10px',textDecoration:'none',fontWeight:'600',fontSize:'16px',display:'inline-block'}}
      >
        Get Full Access for $11.11
      </a>
    </div>
  </>
)
}
