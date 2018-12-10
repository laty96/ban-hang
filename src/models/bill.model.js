import {randomID} from '../utilities';

class Bill {
  constructor(a) {
    this.id =  randomID();
    this.orderid = a.orderid;
    this.ticketid = a.ticketid;
    this.items = a.items;
    this.total = this.items ? +this.items.reduce((acc, c) => +acc + +c.price, 0) : 0;
    this.created_time = Date.now();
    this.completed_time = null;
    this.is_done = false;
  }
}
export default Bill;
