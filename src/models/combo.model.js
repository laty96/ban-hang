import {randomID} from '../utilities'

class Combo {
  constructor(a) {
    this.id = randomID()
    this.name  = a.name
    this.items = a.items
    this.created_time = Date.now()
    this.price = +a.price
    this.stock = +a.stock
    this.discount_percent = +a.discount_percent
    this.discount_value = +a.discount_value
    this.final_price = (this.price - this.discount_value) * (100 - this.discount_percent) / 100;
  }
}

export default Combo