import { axiosClassic } from '../../api/interceptors'
import { getWorkingHoursUrl } from '../../configs/api.config'

// workingHour
// WorkingHour
// workingHours
// WorkingHours
export const workingHoursService = {
  async getWorkingHours(id) {
    const res = await axiosClassic.get(getWorkingHoursUrl(`/location/${id}`))
    // console.log(777, 'res', res)
    return res
  }

  // async getCurrentDoctor(id: string) {
  //   const response = await axiosClassic.get<any>(getWorkingHoursUrl(`/${id}`))
  //   return response
  // },

  // async getProfile(userId: number) {
  //   return axiosClassic.get<any>(getDoctorProfile(String(userId)))
  // }

  // async updateProfile(data: IProfileInput) {
  // 	return axios.put<string>(getWorkingHoursUrl('/profile'), data)
  // },

  // async getById(_id: string) {
  // 	return axios.get<IDoctor>(getWorkingHoursUrl(`/${_id}`))
  // },

  // async updateDoctor(_id: string, data: IProfileInput) {
  // 	return axios.put<string>(getWorkingHoursUrl(`/${_id}`), data)
  // },

  // async deleteDoctor(_id: string) {
  // 	return axios.delete<string>(getWorkingHoursUrl(`/${_id}`))
  // },

  // async getFavorites() {
  // 	return axios.get<IMovie[]>(getWorkingHoursUrl('/profile/favorites'))
  // },

  // async toggleFavorite(movieId: string) {
  // 	return axios.put(getWorkingHoursUrl('/profile/favorites'), {
  // 		movieId,
  // 	})
  // },
}
