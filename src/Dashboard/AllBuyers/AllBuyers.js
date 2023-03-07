import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyers = () => {

  const [deletingBuyer, setDeletingBuyer] = useState(null)

  const closeModal = () => {
    setDeletingBuyer(null)
  }

  const { data: buyers, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/buyers', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;

    }
  });

  // delete buyers 

  const handleDeleteBuyer = (buyer) => {
    fetch(`http://localhost:5000/buyers/${buyer._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`buyer ${buyer.name} deleted successfully`)

        }
      })
  }



  if (isLoading) {
    return <Loading></Loading>
  }
  // console.log(buyers)
  return (

    <div>
      <h2 className='text-4xl mb-5'>Manage Buyers: {buyers?.length}</h2>
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
              buyers?.map((buyer, i) =>
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td><div className="avatar">
                    <div className="w-16 mask mask-squircle">
                      <img src={buyer.img} alt="" />
                    </div>
                  </div></td>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>

                  <td>

                    <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete </label>
                  </td>
                </tr>)
            }

          </tbody>
        </table>
      </div>

      {/* ConfirmationModal */}

      {
        deletingBuyer && <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`If You delete ${deletingBuyer.name}, It cannot be undone`}
          successAction={handleDeleteBuyer}
          successButtonName='Delete'
          modalData={deletingBuyer}
          closeModal={closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default AllBuyers;