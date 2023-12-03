import mongoose from 'mongoose'
import Crop from '../models/Crop.js'
import Category from '../models/Category.js'
import User from '../models/User.js'

const getAnalytics = async () => {
    const db_stats = (({
        collections,
        views,
        objects,
        avgObjSize,
        dataSize,
        storageSize,
        totalFreeStorageSize,
        numExtents,
        indexes,
        indexSize,
        indexFreeStorageSize,
        fileSize,
        nsSizeMB,
        ok,
    }) => ({
        collections,
        views,
        objects,
        avgObjSize,
        dataSize,
        storageSize,
        totalFreeStorageSize,
        numExtents,
        indexes,
        indexSize,
        indexFreeStorageSize,
        fileSize,
        nsSizeMB,
        ok,
    }))(await mongoose.connection.db.stats())

    const cropStats = filterCollectionStats(await Crop.collection.stats())
    const catogoryStats = filterCollectionStats(
        await Category.collection.stats()
    )
    const userStats = filterCollectionStats(await User.collection.stats())

    const analytics = {
        db: db_stats,
        collections: {
            crop: cropStats,
            category: catogoryStats,
            user: userStats,
        },
    }

    return analytics
}

const filterCollectionStats = (stats) => {
    return (({
        ns,
        size,
        count,
        avgObjSize,
        numOrphanDocs,
        storageSize,
        freeStorageSize,
        capped,
        nindexes,
        totalIndexSize,
        totalSize,
        indexSizes,
        scaleFactor,
    }) => ({
        name: ns.split('.').pop(),
        size,
        count,
        avgObjSize,
        numOrphanDocs,
        storageSize,
        freeStorageSize,
        capped,
        nindexes,
        totalIndexSize,
        totalSize,
        indexSizes,
        scaleFactor,
    }))(stats)
}

export default {
    getAnalytics,
}

// {
//     size: 1273,
//     count: 2,
//     avgObjSize: 636,
//     numOrphanDocs: 0,
//     storageSize: 36864,
//     freeStorageSize: 16384,
//     capped: false,
//     nindexes: 3,
//     totalIndexSize: 110592,
//     totalSize: 147456,
//     indexSizes: { _id_: 36864, name_1: 36864, botanical_1: 36864 },
//     scaleFactor: 1,
//   }
