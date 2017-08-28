import { merge } from 'lodash'

import users from './users'
import affiliates from './affiliates'
import contacts from './contacts'

export default merge(
    users,
    affiliates,
    contacts
)