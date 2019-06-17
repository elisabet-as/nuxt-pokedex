import { Database } from '@vuex-orm/core'
import Characters from '~/models/Characters'
import Character from '~/models/Character'

const database = new Database()

database.register(Characters)
database.register(Character)

export default database
