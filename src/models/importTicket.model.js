import {randomID} from '../utilities';

class Ticket {
  constructor(a) {
    this.id = randomID();
    this.order_id = a.order_id;
    this.items = a.items;
    this.is_confirmed = false;
    this.created_time = Date.now();
    this.completed_time  = '';
    this.type = a.type;
  }
}

export default Ticket;