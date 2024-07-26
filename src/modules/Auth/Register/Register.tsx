import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import CameraAltIcon from '@mui/icons-material/CameraAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

import { authApi } from '@libs/firebase/authenticate'
import { PATH } from '@routes/path'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '100%',
  zIndex: 2
})

const UploadAvatar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  height: 220,
  width: '100%',
  border: `1px dashed ${theme.palette.text.secondary}`,
  borderRadius: 8,
  borderStyle: 'dashed',
  position: 'relative',
  zIndex: 1,
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.main
  }
}))

const schema = z
  .object({
    displayName: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .refine((value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value), 'Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .refine(
        (value) => /^[a-zA-Z0-9]{6,20}$/.test(value),
        'Password must be 6-8 characters long and contain only letters and numbers'
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    avatar: z.any().refine((value) => value !== undefined, 'Avatar is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

type RegisterFormValues = z.infer<typeof schema>

const Register = () => {
  const navigate = useNavigate()

  const [steps, setStep] = useState<'info' | 'avatar'>('info')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutate: registerMutate, isPending } = useMutation({
    mutationFn: (payload: RegisterFormValues) =>
      authApi.register(payload.email, payload.password, payload.displayName, avatar[0]),
    onSuccess: async (currentUser) => {
      if (!currentUser) return
      navigate(PATH.LOGIN, { state: { email: currentUser.email } })
    }
  })

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined
    },
    resolver: steps === 'info' ? zodResolver(schema) : undefined,
    criteriaMode: 'all'
  })

  const avatar = watch('avatar')

  console.log({ avatar })

  const handleClickShowPassword = (type: string) => {
    if (type === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleUploadAvatar = (file: File) => {
    console.log({ file })
  }

  const onsubmit = (data: RegisterFormValues) => {
    if (steps === 'info') return setStep('avatar')
    console.log({ data })
    registerMutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} display={steps === 'avatar' ? 'none' : 'block'}>
          <TextField
            {...register('displayName')}
            placeholder='Enter your name...'
            size='medium'
            fullWidth
            label='Display Name'
            error={!!errors.displayName?.message}
          />
          {errors.displayName?.message && (
            <FormHelperText id='email-error-text' error>
              {errors.displayName?.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} display={steps === 'avatar' ? 'none' : 'block'}>
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
        <Grid item xs={12} display={steps === 'avatar' ? 'none' : 'block'}>
          <TextField
            {...register('password')}
            placeholder='Enter your password...'
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
                    onClick={() => handleClickShowPassword('password')}
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
        <Grid item xs={12} display={steps === 'avatar' ? 'none' : 'block'}>
          <TextField
            {...register('confirmPassword')}
            placeholder='Enter your password...'
            size='medium'
            fullWidth
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            error={!!errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => handleClickShowPassword('confirmPassword')}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {errors.confirmPassword?.message && (
            <FormHelperText error id='confirmPassword-error-text'>
              {errors.confirmPassword?.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} display={steps === 'avatar' ? 'block' : 'none'}>
          <Typography fontSize={14} fontWeight={600} mb={2}>
            Upload avatar
          </Typography>
          <UploadAvatar>
            {avatar && avatar?.length > 0 && avatar[0] && (
              <>
                <Box width='100%' height='100%' p={1} borderRadius={8} textAlign='center'>
                  <img
                    width='50%'
                    height='100%'
                    src={URL.createObjectURL(avatar[0])}
                    alt='avatar'
                    style={{ objectFit: 'cover', borderRadius: 6 }}
                  />
                </Box>
                <IconButton
                  size='small'
                  sx={{ position: 'absolute', top: 10, right: 10 }}
                  onClick={() => setValue('avatar', undefined)}
                >
                  <DeleteIcon fontSize='small' color='error' />
                </IconButton>
              </>
            )}
            {(!avatar || avatar?.length === 0) && (
              <Box component='label' sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <CameraAltIcon />
                <Typography fontSize={14} mt={2}>
                  File accepted: jpg, jpeg, png
                </Typography>
                <Typography fontSize={12} color='text.secondary' mt={0.5}>
                  Max size: 5mb
                </Typography>
                <VisuallyHiddenInput accept='.jpg,.jpeg,.png' type='file' {...register('avatar')} />
              </Box>
            )}
          </UploadAvatar>
          {errors.avatar?.message && (
            <FormHelperText error id='avatar-error-text'>
              {errors.avatar?.message as string}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            disabled={steps === 'avatar' && (!avatar || avatar?.length === 0)}
            loading={isPending}
            type='submit'
            size='large'
            variant='contained'
            color='primary'
            fullWidth
          >
            {steps === 'info' ? 'Next' : 'Sign up'}
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={14} textAlign='center'>
            If you already have an account,{' '}
            <Typography
              fontSize={14}
              component='span'
              color='primary'
              fontWeight={600}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(PATH.LOGIN)}
            >
              Sign in
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </form>
  )
}

export default Register
