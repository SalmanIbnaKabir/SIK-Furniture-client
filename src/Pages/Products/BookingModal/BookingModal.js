import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ product, setModalClose }) => {
  const { user } = useContext(AuthContext);

  const bookingDate = new Date().toLocaleString();

  const { resalePrice, name, picture } = product;

  const handleBooking = event => {
    event.preventDefault();

    const phone = event.target.phone.value;
    const meetLocation = event.target.meetLocation.value;

    const booking = {
      name: user?.displayName,
      email: user?.email,
      productName: name,
      price: resalePrice,
      phone,
      meetLocation,
      bookingDate,
      img: picture
    }
    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`

      },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged) {
          setModalClose(false)
          toast.success(`Dear User ${user?.displayName} Booking Confirmed`);
        }
        else {
          toast.error('Try Again');
          setModalClose(false)

        }
      })
      .catch(error => {
        console.log(error)
      })

  }

  return (
    <div>


      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">


          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Product: {name}</h3>
          <p className="py-4">Price: <span className='text-orange-500 font-semibold'> ${resalePrice}</span></p>

          <form onSubmit={handleBooking}>
            <input type="text" defaultValue={user?.displayName} disabled className="input input-bordered input-warning w-full max-w-md" />
            <input type="text" defaultValue={user?.email} disabled className=" my-4 input input-bordered input-warning w-full max-w-md" />
            <input type="text" name='phone' placeholder='Your Contact Number' required className="input input-bordered input-warning w-full max-w-md" />
            <input type="text" name='meetLocation' placeholder='Meting Location' required className="my-4 input input-bordered input-warning w-full max-w-md" />

            <input type="submit" value="Booking Now" className='btn btn-outline  btn-warning  py-2' />
          </form>
        </div>
      </div>
    </div >
  );
};

export default BookingModal;