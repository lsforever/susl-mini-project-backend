import fs from 'fs'
const loadJSON = (path) =>
    JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
var zones = loadJSON('../utils/geodata/zones.json')
import { polygon } from '@turf/helpers'
zones.features.forEach((feature) => {
    feature.geometry.coordinates.forEach((poly, i, arr) => {
        arr[i] = polygon(poly)
    })
})

export default {
    zones,
}
