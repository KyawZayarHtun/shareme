import React from 'react'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import {client} from '../client.js'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const responseGoogle = (res) => {

    const userObj = jwtDecode(res.credential)

    localStorage.setItem('user', JSON.stringify(userObj))

    const {name, picture, aud} = userObj

    const doc = {
      _id: aud,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', {replace: true})
      })
  }

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          loop
          autoPlay
          muted={true}
          controls={false}
          className='w-full h-full object-cover'
        />
        <div
          className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} alt='Logo' width='130' />
          </div>
          <div className='shadow-2xl'>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
              <GoogleLogin
                theme={'filled_blue'}
                text={'continue_with'}
                shape={'pill'}
                logo_alignment={'left'}
                onSuccess={responseGoogle}
                onError={() => alert('Login Failed')}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login