import React from 'react'
import toast from 'react-hot-toast'
import { Input } from '@heroui/input'
import { NavLink } from 'react-router-dom'
import { reqAuthLogin } from '@/modules/auth/services'
/* import BackgroundImage from '@/assets/img/background.gif' */
import { LoginUserDto } from '../services/interfaces'
import './Auth.scss'

export const Login = () => {
  const [data, setData] = React.useState<LoginUserDto>({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    reqAuthLogin(data)
      .then((response) => {
        const tokenRes = response.data

        if (!token) {
          localStorage.setItem('token', tokenRes)
          window.location.reload()
        }
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          toast.error(error.response.data.errors[0]?.messages[0])
        }

        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        }
      })
  }

  const inputs = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Ingresa tu correo',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Ingresa tu contraceña',
    },
  ]

  return (
    <form onSubmit={handleLogin}>
      <div className='authContainer'>
        <div className='authFormLeft'>
          <div className='authFormContainer'>
            <div>
              <h3>
                <span className='degradezPalabra'>Iniciar Sesión</span>
              </h3>
              <div className='authForm'>
                {inputs.map((item, index) => (
                  <Input
                    key={index}
                    type={item.type}
                    name={item.name}
                    label={item.label}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                  />
                ))}
              </div>
              <button className='loginButton' type='submit'>
                Iniciar sesión
              </button>
              <p className='authFormMessage'>
                ¿Aún no estas registrado en la plaraforma?
                <span>
                  <NavLink to='/register'> Regístrese</NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='authFormimageRight'>{/* <img src={BackgroundImage} /> */}</div>
      </div>
    </form>
  )
}
