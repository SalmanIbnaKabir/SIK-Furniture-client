import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/AuthProvider';

const MyBookings = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <h3 className="text-3xl mb-5">My Order</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Product Img</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {
              bookings &&
              bookings?.map(((booking, i) =>

                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-16 mask mask-squircle">
                        <img src={booking.img} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{booking.productName}</td>

                  <td><strong>{booking.price ? `$ ${booking.price}` : ''}</strong></td>
                  <td><button className='btn btn-sm btn-warning'>Pay</button></td>
                </tr>
              ))

            }


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;