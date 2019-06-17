import { Model } from '@vuex-orm/core'

export default class Character extends Model {
  static entity = 'character'

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      img: this.string(''),
      evolvesFrom: this.string(''),
      isBaby: this.string(''),
      evolvesTo: this.string('')
    }
  }
}
