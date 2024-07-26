import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useMutation } from '@tanstack/react-query'

import { authApi } from '@libs/firebase/authenticate'
import { PATH } from '@routes/path'
import { useAuthStore } from '@stores/authStore'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .refine(
      (value) => /^[a-zA-Z0-9]{6,20}$/.test(value),
      'Password must be 6-20 characters long and contain only letters and numbers'
    )
})

type LoginFormValues = z.infer<typeof schema>

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore() //👈
  const { state } = useLocation()

  const emailState = state?.email || ''

  const [showPassword, setShowPassword] = useState(false)

  const { mutate: signInMutate, isPending } = useMutation({
    mutationFn: (payload: LoginFormValues) => authApi.signIn(payload.email, payload.password),
    // onSuccess: (currentUser) => setUser(currentUser),
    onError: (error) => {
      console.log('error', error)
    }
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema),
    criteriaMode: 'all'
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = (data: LoginFormValues) => {
    signInMutate(data)
  }

  useEffect(() => {
    if (emailState) setValue('email', emailState)
  }, [emailState])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4} mb={2}>
        <Grid item xs={12}>
          <TextField
            {...register('email')}
            placeholder='Enter your email...'
            size='medium'
            fullWidth
            label='Email'
            error={!!errors.email?.message}
          />
          {errors.email?.message && (
            <FormHelperText id='email-error-text' error>
              {errors.email?.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('password')}
            placeholder='Enter your email...'
            size='medium'
            fullWidth
            label='Password'
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {errors.password?.message && (
            <FormHelperText error id='password-error-text'>
              {errors.password?.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={14} textAlign='right' color='primary' sx={{ cursor: 'pointer' }}>
            Forgot password?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton loading={isPending} type='submit' size='large' variant='contained' color='primary' fullWidth>
            Sign in
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={14} textAlign='center'>
            Don't have an account?{' '}
            <Typography
              fontSize={14}
              component='span'
              color='primary'
              fontWeight={600}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(PATH.REGISTER)}
            >
              Sign up
            </Typography>
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Divider>OR</Divider>
        </Grid> */}
      </Grid>
    </form>
  )
}

export default Login
