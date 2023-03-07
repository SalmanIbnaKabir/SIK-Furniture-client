import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import useToken from '../../hooks/useToken';

const SingUp = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  // const errors = '';
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false)

  const [createdUserEmail, setCreatedUserEmail] = useState('');

  const [token] = useToken(createdUserEmail)

  // image bb host key;
  const imageHostKey = process.env.REACT_APP_imgbb_key

  const navigate = useNavigate();

  if (token) {
    navigate('/')
  }


  const handleSignUp = (data) => {
    // console.log(data);

    setSignUpError('');
    setLoading(true);

    const image = data.file[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        const image = imgData.data.url;
        if (imgData.success) {
          createUser(data.email, data.password)
            .then(result => {
              const user = result.user;
              console.log(user);
              toast.success('User Created Successfully')
              const userInfo = {
                displayName: data.name,
                photoURL: image
              }
              // console.log(userInfo);
              updateUser(userInfo)
                .then(() => {
                  saveUser(data.name, data.email, data.role, image)
                  reset();
                  setLoading(false);

                })
                .catch(err => {
                  // console.log(err)
                  setSignUpError(err.message)

                  setLoading(false);

                })
            })
            .catch(error => {
              // console.log(error)
              setSignUpError(error.message)
              setLoading(false);

            });
        }
      })
  };

  // user save in server
  const saveUser = (name, email, role, img) => {
    const user = { name, email, role, img };
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        // console.log('saveUser', data);
        setCreatedUserEmail(email)
          ;
      })
  };

  const handleGoogleSignUp = () => {
    googleSignIn()
      .then(result => {
        const user = result.user;
        // console.log(user);
        saveUser(user?.displayName, user?.email, 'buyer', user?.photoURL)
        toast.success('User Created Successfully')

      })
      .catch(err => {
        console.error(err);
        setSignUpError(err.message)
      })
  }



  return (


    <div className='h-[700px]  flex justify-center items-center'>
      <div className='w-96 px-7'>
        <h2 className='text-2xl text-center font-semibold'>Sign Up</h2>


        <form onSubmit={handleSubmit(handleSignUp)} >
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              {...register("name",
                { required: "name is required" }
              )}
              type="text" className="input input-bordered w-full max-w-xs" />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              {...register("email",
                { required: 'email required' }
              )}
              type="email" className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>


          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Choose Profile Picture</span></label>
            <input
              {...register("file",
                { required: 'Picture required' }
              )}
              type="file" className="input input-bordered w-full max-w-xs" />
            {errors.file && <p className='text-red-600'>{errors.file.message}</p>}
          </div>


          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              {...register("password", {
                required: "password is required",
                minLength: { value: 6, message: 'password must be 6 characters long' },

              }
              )}
              type="password" className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Choose  One</span></label>
            <select {...register('role', { required: "You must select one" })} name="role" id="" className='select select-bordered'>

              <option value="seller">Are You Seller</option>
              <option value="buyer"  >Are You Buyer</option>
            </select>
            {errors.role && <p className='text-red-600'>{errors.role.message}</p>}
          </div>


          {/* spinner  */}
          {loading && <Loading></Loading>}

          <input type="submit" disabled={loading} className='btn btn-warning w-full mt-5' value='sign up' />
          {signUpError && <p className='text-red-600'>{signUpError?.split('/')[1].split(')')[0]}</p>}
        </form>
        <p>Already have an account  ? <Link className='text-secondary text-sm ' to='/login'> Please Login</Link></p>



        <div className='divider'>OR</div>
        <button className='btn btn-outline  w-full' onClick={handleGoogleSignUp}>
          {/* //google svg icon */}
          <FcGoogle className='text-2xl mr-2' />
          continue with google</button>

      </div>

    </div>

  );
};

export default SingUp;