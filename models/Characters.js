import { Model } from '@vuex-orm/core'

export default class Characters extends Model {
  static entity = 'characters'

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      img: this.string(''),
      types: this.attr([])
    }
  }
}
