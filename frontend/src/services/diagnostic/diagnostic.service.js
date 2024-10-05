import { axiosClassic } from '../../api/interceptors'
import { getDiagnosticsUrl } from '../../configs/api.config'

// diagnostic
// Diagnostic
// diagnostics
// Diagnostics

export const diagnosticService = {
  async getDiagnostics() {
    return axiosClassic.get(getDiagnosticsUrl(``))
  },
  async getLocsForDiagnostic(diagnosticId) {
    return axiosClassic.get(getDiagnosticsUrl(`/${diagnosticId}/locations`))
  }
}
