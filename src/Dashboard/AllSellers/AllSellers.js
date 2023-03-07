import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllSellers = () => {

  const [deletingSeller, setDeletingSeller] = useState(null)

  const closeModal = () => {
    setDeletingSeller(null)
  }

  const { data: sellers, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/sellers', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;

    }
  });

  // delete buyers 

  const handleDeleteSeller = (seller) => {
    fetch(`http://localhost:5000/sellers/${seller._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`buyer ${seller.name} deleted successfully`)

        }
      })
  }



  if (isLoading) {
    return <Loading></Loading>
  }

  return (

    <div>
      <h2 className='text-4xl mb-5'>Manage Sellers: {sellers?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {
              sellers?.map((seller, i) =>
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td><div className="avatar">
                    <div className="w-16 mask mask-squircle">
                      <img src={seller.img} alt="" />
                    </div>
                  </div></td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>

                  <td>

                    <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete </label>
                  </td>
                </tr>)
            }

          </tbody>
        </table>
      </div>

      {/* ConfirmationModal */}

      {
        deletingSeller && <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`If You delete ${deletingSeller.name}, It cannot be undone`}
          successAction={handleDeleteSeller}
          successButtonName='Delete'
          modalData={deletingSeller}
          closeModal={closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default AllSellers;