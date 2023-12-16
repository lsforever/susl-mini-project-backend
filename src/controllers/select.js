import selectService from '../services/select.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const selectCrops = async (req, res) => {
    const { location, is_long_term, starting_month } = JSON.parse(
        req.query.selection
    )

    //const { location, is_long_term, starting_month } = req.body

    const data = await selectService.getFilteredCropListAndData(
        location.longitude,
        location.latitude,
        is_long_term,
        starting_month
    )
    res.status(StatusCodes.OK).json({
        status: ReasonPhrases.OK,
        data: data,
    })
}

export default {
    selectCrops,
}
