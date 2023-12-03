import AccessControl from 'accesscontrol'
// const ac = new AccessControl()

// ac.grant('basic').readOwn('profile').updateOwn('profile')

// ac.grant('supervisor').extend('basic').readAny('profile')

// ac.grant('admin')
//     .extend('basic')
//     .extend('supervisor')
//     .updateAny('profile')
//     .deleteAny('profile')

// can lock access control with lock() anytime if needed
import { roles } from '../constants/index.js'
import UserModel from '../models/User.js'
import CropModel from '../models/Crop.js'
import CategoryModel from '../models/Category.js'
let grantsObject = {
    [roles.ADMIN]: {
        [UserModel.modelName]: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
        [CropModel.modelName]: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
        [CategoryModel.modelName]: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
        ['analytics']: {
            'read:any': ['*'],
        },
    },
    [roles.USER]: {
        [UserModel.modelName]: {
            //'create:own': ['*', '!rating', '!views'],
            'create:own': ['*', '!emailVerified', '!salt', '!token'],
            'read:own': ['*', '!password', '!salt', '!token'],
            'update:own': ['*', '!emailVerified', '!salt', '!token'],
        },
        [CropModel.modelName]: {
            'read:any': ['*'],
        },
    },
}

const ac = new AccessControl(grantsObject)
ac.grant(roles.OWNER).extend(roles.ADMIN)

export default ac
