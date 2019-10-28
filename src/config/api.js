import config from './config'

const { apiBase } = config 

// fetch url for test
export const createAdmin = apiBase + '/v2/cms/account/permission/management/admin/create'