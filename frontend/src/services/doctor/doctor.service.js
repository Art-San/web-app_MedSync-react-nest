import { axiosClassic } from '../../api/interceptors'
import { getDoctorsUrl } from '../../configs/api.config'

export const doctorService = {
  async getDoctors() {
    return axiosClassic.get(getDoctorsUrl(``))
  }
  // async searchDoctors1(searchTerm?: string) {
  //   return axiosClassic.get<IDoctor[]>(getDoctorsUrl(``), {
  //     params: searchTerm
  //       ? {
  //           searchTerm
  //         }
  //       : {}
  //   })
  // },

  // async searchDoctors(
  //   page: string,
  //   pageSize: string,
  //   searchTerm?: string
  // ): Promise<IPaginationResult<IDoctor>> {
  //   const response = await axiosClassic.get<IPaginationResult<IDoctor>>(
  //     getDoctorsUrl(``),
  //     {
  //       params: { page, pageSize, searchTerm }
  //     }
  //   )
  //   return response.data
  // },

  // async getCurrentDoctor(id: string) {
  //   const response = await axiosClassic.get<any>(getDoctorsUrl(`/${id}`))
  //   return response
  // },

  // async getProfile(userId: number) {
  //   return axiosClassic.get<any>(getDoctorProfile(String(userId)))
  // }

  // async updateProfile(data: IProfileInput) {
  // 	return axios.put<string>(getDoctorsUrl('/profile'), data)
  // },

  // async getById(_id: string) {
  // 	return axios.get<IDoctor>(getDoctorsUrl(`/${_id}`))
  // },

  // async updateDoctor(_id: string, data: IProfileInput) {
  // 	return axios.put<string>(getDoctorsUrl(`/${_id}`), data)
  // },

  // async deleteDoctor(_id: string) {
  // 	return axios.delete<string>(getDoctorsUrl(`/${_id}`))
  // },

  // async getFavorites() {
  // 	return axios.get<IMovie[]>(getDoctorsUrl('/profile/favorites'))
  // },

  // async toggleFavorite(movieId: string) {
  // 	return axios.put(getDoctorsUrl('/profile/favorites'), {
  // 		movieId,
  // 	})
  // },
}
