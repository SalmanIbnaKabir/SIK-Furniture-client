import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const { signIn, googleSignIn } = useContext(AuthContext);

  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false)
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = useToken(loginUserEmail);

  // console.log(loginUserEmail);

  const location = useLocation();

  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/';

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = data => {
    // console.log(data);
    // setLoginUserEmail(data.email);
    
    setLoading(true)
    setLoginError('')
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        // console.log(user.email);
        // console.log(data.email);
        // problem not solved
        setLoginUserEmail(data.email);
        // setLoginUserEmail(user.email);
        setLoading(false)
        // navigate(from, { replace: true })
        reset()

      })
      .catch(error => {
        // console.log(error)
        setLoginError(error.message)
        setLoading(false)
      })

  }
  // google sign in 
  const handleGoogleLogin = () => {

    googleSignIn()
      .then(result => {
        const user = result.user;
        // console.log(user);
        setLoginUserEmail(user.email)
        // navigate(from, { replace: true })


      })
      .catch(err => {
        console.error(err);
        setLoginError(err.message)
      })
  }
  return (
    <div className='h-[600px]  flex justify-center items-center'>
      <div className='w-96 px-7'>
        <h2 className='text-2xl text-center font-semibold'>Login</h2>


        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="email" className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className='text-red-600 text-sm pt-2'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              {...register("password",
                {
                  required: "Password required",
                }

              )}
              type="password" className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className='text-red-600 text-sm pt-2'>{errors.password?.message}</p>}
            <label className="label"><span className="label-text">Forget Password ?</span></label>
          </div>
          {loading && <Loading></Loading>}
          <input type="submit" disabled={loading} className='btn  btn-warning w-full' value='Login' />
          <div>
            {loginError && <p className='text-red-600'>{loginError.split('/')[1].split(')')[0]}</p>}
          </div>
        </form>
        <p className='mt-3'>New to SIK Furniture ? <Link className='text-secondary ' to='/signup'>Create new Account</Link></p>

        <div className='divider'>OR</div>
        <button className='btn btn-outline  w-full' onClick={handleGoogleLogin}>
          {/* google icon */}
          <FcGoogle className='text-2xl mr-2' />
          continue with google</button>
      </div>
    </div>
  );
};

export default Login;