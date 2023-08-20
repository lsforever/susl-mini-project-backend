import AccessControl from 'accesscontrol'
const ac = new AccessControl()

ac.grant('basic').readOwn('profile').updateOwn('profile')

ac.grant('supervisor').extend('basic').readAny('profile')

ac.grant('admin')
    .extend('basic')
    .extend('supervisor')
    .updateAny('profile')
    .deleteAny('profile')

// can lock access control with lock() anytime if needed

export default ac
