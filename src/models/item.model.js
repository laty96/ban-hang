import {randomID} from '../utilities';

class Item {
  constructor(a) {
    this.id = randomID();
    this.name = a.name;
    this.stock = +a.stock;
    this.price = +a.price;
    this.discount_percent = +a.discount_percent || 0;
    this.discount_value = +a.discount_value || 0;
    this.final_price = +(this.price - this.discount_value) * (100 - this.discount_percent) / 100;
    this.created_time = Date.now();
  }
}
export default Item;
