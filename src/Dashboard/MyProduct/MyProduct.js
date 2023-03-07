import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';


const MyProduct = () => {
  const { user } = useContext(AuthContext);

  const [deletingProduct, setDeletingProduct] = useState(null)

  const closeModal = () => {
    setDeletingProduct(null)
  };
  // console.log(user.email)

  // get products by email
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;

    }
  });

  // delete product 

  const handleDeleteProduct = (product) => {
    fetch(`http://localhost:5000/products/${product._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.deletedCount > 0) {
          toast.success(`this ${product.name} deleted successfully`)
          refetch();

        }
      })
  }



  if (isLoading) {
    return <Loading></Loading>
  }

  return (

    <div>
      <h2 className='text-4xl mb-5'>Manage Product: {products?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Product Img</th>
              <th>Name</th>
              <th>Price</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {
              products?.map((product, i) =>
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td><div className="avatar">
                    <div className="w-16 mask mask-squircle">
                      <img src={product.picture} alt="" />
                    </div>
                  </div></td>
                  <td>{product.name}</td>
                  <td>{product.resalePrice}</td>

                  <td>

                    <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete </label>
                  </td>
                </tr>)
            }

          </tbody>
        </table>
      </div>

      {/* ConfirmationModal */}

      {
        deletingProduct && <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`If You delete ${deletingProduct.name}, It cannot be undone`}
          successAction={handleDeleteProduct}
          successButtonName='Delete'
          modalData={deletingProduct}
          closeModal={closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default MyProduct;