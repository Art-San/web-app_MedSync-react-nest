import { axiosClassic } from '../../api/interceptors'
import { getLocationsUrl } from '../../configs/api.config'

// location
// Location
// locations
// Locations

export const locationService = {
  async getLocation(locationId) {
    return axiosClassic.get(getLocationsUrl(`/${locationId}`))
  }
  // async searchLocations1(searchTerm?: string) {
  //   return axiosClassic.get<IDoctor[]>(getLocationsUrl(``), {
  //     params: searchTerm
  //       ? {
  //           searchTerm
  //         }
  //       : {}
  //   })
  // },

  // async searchLocations(
  //   page: string,
  //   pageSize: string,
  //   searchTerm?: string
  // ): Promise<IPaginationResult<IDoctor>> {
  //   const response = await axiosClassic.get<IPaginationResult<IDoctor>>(
  //     getLocationsUrl(``),
  //     {
  //       params: { page, pageSize, searchTerm }
  //     }
  //   )
  //   return response.data
  // },

  // async getCurrentDoctor(id: string) {
  //   const response = await axiosClassic.get<any>(getLocationsUrl(`/${id}`))
  //   return response
  // },

  // async getProfile(userId: number) {
  //   return axiosClassic.get<any>(getDoctorProfile(String(userId)))
  // }

  // async updateProfile(data: IProfileInput) {
  // 	return axios.put<string>(getLocationsUrl('/profile'), data)
  // },

  // async getById(_id: string) {
  // 	return axios.get<IDoctor>(getLocationsUrl(`/${_id}`))
  // },

  // async updateDoctor(_id: string, data: IProfileInput) {
  // 	return axios.put<string>(getLocationsUrl(`/${_id}`), data)
  // },

  // async deleteDoctor(_id: string) {
  // 	return axios.delete<string>(getLocationsUrl(`/${_id}`))
  // },

  // async getFavorites() {
  // 	return axios.get<IMovie[]>(getLocationsUrl('/profile/favorites'))
  // },

  // async toggleFavorite(movieId: string) {
  // 	return axios.put(getLocationsUrl('/profile/favorites'), {
  // 		movieId,
  // 	})
  // },
}
