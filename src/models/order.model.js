import {randomID} from '../utilities';

class Order {
    constructor(a) {
        this.id = randomID()
        this.name = a.name || 'user';
        this.items = a.items;
        this.employee_id = a.employee_id || '';
        this.store_id = a.store_id || '';
        this.created_time = Date.now();
        this.completed_time = '';
        this.is_done = false;
    }
}

export default Order;