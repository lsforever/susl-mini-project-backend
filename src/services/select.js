import zoneData from '../repositories/select.js'
// import turf from '@turf/helpers'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { point } from '@turf/helpers'
import ApiError from '../utils/errors/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import cropRepository from '../repositories/crop.js'
// import { climateZones } from '../constants/index.js'

const getZoneForLocation = (longitude, latitude) => {
    var loc = point([longitude, latitude])
    for (const feature of zoneData.zones.features) {
        for (const poly of feature.geometry.coordinates) {
            if (booleanPointInPolygon(loc, poly)) {
                return feature.properties
            }
        }
    }
    return null
}
const getFilteredCropListAndData = async (
    longitude,
    latitude,
    is_long_term = false,
    starting_month = 1
) => {
    const zone = getZoneForLocation(longitude, latitude)
    // {
    //     objectid: 122,
    //     zone: 'IM2a',
    //     climatic_zone: 'INTERMEDIATE ZONE',
    //     agro_eco_zone: 'IM2a',
    //     agro_eco_r: 'IM2a',
    //     final_id: null,
    //     terrain: 'steep, Hilly & rolling',
    //     major_soil: 'RBL & RYP soils',
    //     land_use:
    //         'Export agriculture Crops, Mixed Home Gardens, Tea, Vegetables',
    //     anualrfmm: '>1800',
    //     'st_area(shape)': 0.033790508929347395,
    //     'st_length(shape)': 1.854290795579208,
    // }
    if (!zone) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Location', {
            message: 'Invalid Location is selected',
        })
    }
    const climateZone = zone.climatic_zone.split(' ')[0].toLowerCase()

    const crops = await cropRepository.getCropsWithoutPagination({
        'factors.long_term': is_long_term,
        'factors.zones.zone': climateZone,
        'factors.zones.months': starting_month,
    })

    // const crops = await cropRepository.getCropsWithoutPagination({
    //     'factors.long_term': is_long_term,
    //     'factors.zones': {
    //         $elemMatch: { zone: climateZone, months: starting_month },
    //     },
    // })

    const data = {
        input: {
            location: { longitude, latitude },
            is_long_term,
            starting_month,
        },
        properties: zone,
        zone: climateZone,
        count: crops.length,
        crops: crops,
    }

    return data
}

export default {
    getZoneForLocation,
    getFilteredCropListAndData,
}
