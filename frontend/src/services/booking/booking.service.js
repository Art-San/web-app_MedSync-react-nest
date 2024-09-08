import { axiosClassic } from '../../api/interceptors'
import { getBookingUrl } from '../../configs/api.config'

// /api/booking/${itemType}
// Booking
// booking
// Bookings
// bookings
export const bookingService = {
  async createdBooking(itemType, data) {
    return axiosClassic.post(getBookingUrl(`/${itemType}`), data)
  }
}
