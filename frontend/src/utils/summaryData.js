import axios from 'axios'

const fetchUserDataAndLocationInfo = async (storage) => {
  try {
    let savedUserData = JSON.parse(await storage.getItem('user_data'))
    let selectedTimeSlot = JSON.parse(await storage.getItem('selectedTimeSlot'))
    const locationInfo = JSON.parse(await storage.getItem('selectedLocation'))

    try {
      const workingHours = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/working-hours/${
          locationInfo.locationId
        }`
      )

      // создать объект даты из строки внутри selectedTimeSlot
      selectedTimeSlot = new Date(selectedTimeSlot)

      return {
        error: false,
        selectedTimeSlot: selectedTimeSlot,
        selectedLocation: locationInfo,
        userData: savedUserData,
        hoursArray: workingHours.data
      }
    } catch (err) {
      console.error(err)
      return {
        error: true
      }
    }
  } catch (err) {
    console.error(err)
    return {
      error: true
    }
  }
}

export default fetchUserDataAndLocationInfo

/*TODO: от GPT  на один меньше блок*/

//  import axios from 'axios'

// const fetchUserDataAndLocationInfo = async (storage) => {
//   try {
//     let savedUserData = JSON.parse(await storage.getItem('user_data'))
//     let selectedTimeSlot = JSON.parse(await storage.getItem('selectedTimeSlot'))
//     const locationInfo = JSON.parse(await storage.getItem('selectedLocation'))

//     if (!savedUserData || !selectedTimeSlot || !locationInfo) {
//       throw new Error('Missing data in storage')
//     }

//     const workingHours = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/working_hours/${locationInfo.location_id}`
//     )

//     // создать объект даты из строки внутри selectedTimeSlot
//     selectedTimeSlot = new Date(selectedTimeSlot)

//     return {
//       error: false,
//       selectedTimeSlot: selectedTimeSlot,
//       selectedLocation: locationInfo,
//       userData: savedUserData,
//       hoursArray: workingHours.data
//     }
//   } catch (err) {
//     console.error('Error in fetchUserDataAndLocationInfo:', err)
//     return { error: true }
//   }
// }
