import { axiosClassic } from '../../api/interceptors'
import { getSlotsUrl } from '../../configs/api.config'
// https://medsync.botfather.dev/api/slots/doctors/1/2/7
// ;('slots/doctors/:doctorId/:locationId/:monthNumber')
// Slot
// slot
// slots
// Slots
export const slotService = {
  async getSlots(itemType, itemId, locationId, monthNumber) {
    return axiosClassic.get(
      getSlotsUrl(`/${itemType}/${itemId}/${locationId}/${monthNumber}`)
    )
  }
}
