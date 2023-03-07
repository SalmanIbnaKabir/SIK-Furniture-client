
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/AuthProvider';

const AddProduct = () => {

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const postedTime = new Date().toLocaleString();

  const navigate = useNavigate()
  // image bb host key;
  const imageHostKey = process.env.REACT_APP_imgbb_key

  // add Product function 
  const handleAddProduct = (data) => {

    setLoading(true);

    const name = data.name;
    const resalePrice = data.resalePrice;
    const originalPrice = data.originalPrice;
    const yearsOfUse = data.yearsOfUse;
    const location = data.location;
    const categoryId = data.categoryId;



    const product = {
      name,
      resalePrice,
      originalPrice,
      yearsOfUse,
      location,
      categoryId,
      sellerName: user.displayName,
      sellerEmail: user.email,
      postedTime
    }
    // console.log('inside function ', product)

    // Picture upload
    const image = data.picture[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        const picture = imgData.data.url;
        if (imgData.success) {
          const products = { ...product, picture };
          // console.log("inside image API", products, )
          saveProduct(products);


        }
      })

  }

  // Product save in server
  const saveProduct = (products) => {

    fetch('http://localhost:5000/products', {
      method: "POST",
      headers: {
        'content-type': 'application/json',

        authorization: `bearer ${localStorage.getItem('accessToken')}`

      },
      body: JSON.stringify(products)
    })
      .then(res => res.json())
      .then(data => {
        // console.log('save product', data);
        if (data.acknowledged) {
          setLoading(false)
          toast.success(` Dear ${user?.displayName} Product Add Success`);
          navigate('/');
          reset();
        }
        else {
          toast.error(data.message);
        }


        ;
      })
  };

  return (
    <div className='flex justify-center items-center my-12'>
      <div className='w-96 md:w-[520px] px-7'>
        <h2 className='text-2xl text-center font-semibold' >Add Your Product </h2>

        <form onSubmit={handleSubmit(handleAddProduct)} >

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Product  Name</span></label>
            <input
              {...register("name",
                { required: "product name is required" }
              )}
              type="text" className="input input-bordered w-full max-w-xs md:max-w-lg" />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Product  Image</span></label>
            <input
              {...register("picture",
                { required: "product picture is required" }
              )}
              type="file" className="input input-bordered w-full max-w-xs md:max-w-lg" />
            {errors.picture && <p className='text-red-600'>{errors.picture.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Sell Price</span></label>
            <input
              {...register("resalePrice",
                { required: "Sell Price name is required", valueAsNumber: true, }
              )}
              type="text" className="input input-bordered w-full max-w-xs md:max-w-lg" />
            {errors.resalePrice && <p className='text-red-600'>{errors.resalePrice.message}</p>}

          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Original Price</span></label>
            <input
              {...register("originalPrice",
                { required: "Sell Price name is required", valueAsNumber: true, }
              )}
              type="text" className="input input-bordered w-full max-w-xs md:max-w-lg" />
            {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">How Much Time Use</span></label>
            <input
              {...register("yearsOfUse",
                { required: "Sell Price name is required" }
              )}
              type="text" placeholder='1 Year Use || 8 Month Use'
              className="input input-bordered w-full max-w-xs md:max-w-lg" />
            {errors.yearsOfUse && <p className='text-red-600'>{errors.yearsOfUse.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Your Location </span></label>
            <input
              {...register("location",
                { required: "Sell Price name is required" }
              )}
              type="text"
              className="input input-bordered w-full max-w-xs md:max-w-lg" />
            {errors.location && <p className='text-red-600'>{errors.location.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Product Category </span></label>
            <select {...register('categoryId', { required: "You must select one" })} name="categoryId" id="" className='select select-bordered max-w-xs md:max-w-lg'>

              <option value="1">BedRoom Furniture</option>
              <option value="2">Kitchen Furniture</option>
              <option value="3">Dining Room Furniture</option>
            </select>
            {errors.categoryId && <p className='text-red-600'>{errors.categoryId.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs md:max-w-lg">
            <label className="label"><span className="label-text">Product Condition </span></label>
            <select {...register('condition', { required: "You must select one" })} name="condition" id="" className='select select-bordered max-w-xs md:max-w-lg'>

              <option value="1">excellent</option>
              <option value="1">good</option>
              <option value="1">fair</option>

            </select>
            {errors.condition && <p className='text-red-600'>{errors.condition.message}</p>}
          </div>
          {
            loading && <Loading></Loading>
          }
          <input type="submit" disabled={loading} className='btn btn-warning w-full mt-5' value='add Product' />

        </form>

      </div>

    </div>
  );
};

export default AddProduct;

// condition type(excellent, good, fair)