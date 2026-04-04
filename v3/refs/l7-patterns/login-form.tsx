// login-form — pre-composed login form
import { forwardRef, useState } from 'react'

import { Button } from '../l2-primitives/button'
import { Input } from '../l2-primitives/input'
import { Label } from '../l2-primitives/label'
import { Checkbox } from '../l3-atoms/checkbox'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type LoginFormData = {
  email: string
  password: string
  remember: boolean
}

type LoginFormProps = Omit<
  React.HTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  onSubmit: (data: LoginFormData) => void
  title?: string
  error?: string
  loading?: boolean
  glass?: boolean
}

export const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>(
  function LoginForm(
    {
      onSubmit,
      title = 'Sign in',
      error,
      loading = false,
      glass = false,
      className,
      ...props
    },
    ref
  ) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      onSubmit({ email, password, remember })
    }

    return (
      <form
        ref={ref}
        className={cx(
          'border-border flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6',
          glassClass(glass),
          !glass && 'bg-bg',
          className
        )}
        data-component="login-form"
        onSubmit={handleSubmit}
        {...props}
      >
        <h2 className="text-fg gds-heading text-center font-semibold">
          {title}
        </h2>
        {error !== undefined && (
          <div className="bg-danger/10 text-danger rounded-md px-3 py-2 text-xs">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <Checkbox
          checked={remember}
          onChange={setRemember}
          label="Remember me"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    )
  }
)

export type { LoginFormData, LoginFormProps }
