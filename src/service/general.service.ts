import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"

export const GeneralService ={
    async  updateLessonStatus(id:number) {
        const res = await apiConfig().putRequest(`${ApiUrls.LESSONS}/${id}/status`)
        return res
    }
}