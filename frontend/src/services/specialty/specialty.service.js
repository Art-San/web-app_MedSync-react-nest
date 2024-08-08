import { axiosClassic } from '../../api/interceptors'
import { getSpecialtiesUrl } from '../../configs/api.config'
// Specialty
// specialty
// specialties
// Specialties
export const specialtyService = {
  async getSpecialties() {
    return axiosClassic.get(getSpecialtiesUrl(``))
  }
  // async searchSpecialties1(searchTerm?: string) {
  //   return axiosClassic.get<IDoctor[]>(getSpecialtiesUrl(``), {
  //     params: searchTerm
  //       ? {
  //           searchTerm
  //         }
  //       : {}
  //   })
  // },

  // async searchSpecialties(
  //   page: string,
  //   pageSize: string,
  //   searchTerm?: string
  // ): Promise<IPaginationResult<IDoctor>> {
  //   const response = await axiosClassic.get<IPaginationResult<IDoctor>>(
  //     getSpecialtiesUrl(``),
  //     {
  //       params: { page, pageSize, searchTerm }
  //     }
  //   )
  //   return response.data
  // },

  // async getCurrentDoctor(id: string) {
  //   const response = await axiosClassic.get<any>(getSpecialtiesUrl(`/${id}`))
  //   return response
  // },

  // async getProfile(userId: number) {
  //   return axiosClassic.get<any>(getDoctorProfile(String(userId)))
  // }

  // async updateProfile(data: IProfileInput) {
  // 	return axios.put<string>(getSpecialtiesUrl('/profile'), data)
  // },

  // async getById(_id: string) {
  // 	return axios.get<IDoctor>(getSpecialtiesUrl(`/${_id}`))
  // },

  // async updateDoctor(_id: string, data: IProfileInput) {
  // 	return axios.put<string>(getSpecialtiesUrl(`/${_id}`), data)
  // },

  // async deleteDoctor(_id: string) {
  // 	return axios.delete<string>(getSpecialtiesUrl(`/${_id}`))
  // },

  // async getFavorites() {
  // 	return axios.get<IMovie[]>(getSpecialtiesUrl('/profile/favorites'))
  // },

  // async toggleFavorite(movieId: string) {
  // 	return axios.put(getSpecialtiesUrl('/profile/favorites'), {
  // 		movieId,
  // 	})
  // },
}
