<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#menu1">Create</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Pay</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content mt-1">
      <div id="menu1" class="container tab-pane active">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Quantity</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.stock}}</td>
              <td><input type="number" v-model="item.quantity"></td>
              <td><button class="btn" @click="order(item)">Order</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="menu2" class="container tab-pane">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Total</th>
              <th scope="col">Completed time</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in bill" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{item.id}}</td>
              <td>{{item.total}}</td>
              <td>{{new Date(item.completed_time).toLocaleDateString()}}</td>
              <td>{{item.is_done ? 'Done' : 'Pending'}}</td>
              <td><button class="btn" @click="fetchDetail(item)">Detail</button>
              <button class="btn" @click="checkout(item._id)">Checkout</button>
              <button class="btn" @click="cancel(item._id)">Cancel</button></td>
            </tr>
          </tbody>
        </table>
        <div class="card" v-if="detail">
          <div class="card-header">
						<h3>Bill ID: {{detail.id}}</h3>
          </div>
					<div class="card-body">
            <p>Name: {{detail.name}}</p>
            <p>Date: {{detail.created_time}}</p>
            <p>Employee: {{detail.employee_id}}</p>
            <p>Status: {{detail.is_done ? 'Done' : 'Pending'}}</p>
            <p>
              <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Items
              </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body m-1" v-for="(item, index) in detail.items" :key="index">
                <p>ID: {{item.id}}</p>
                <p>Name: {{item.name}}</p>
                <p>Price: {{item.price}}</p>
                <p>Discount percent: {{item.discount_percent}}%</p>
                <p>Discount value: {{item.discount_value}}</p>
                <p>Quantity: {{item.quantity}}</p>
                <p>Stock: {{item.stock}}</p>
                <p>Added Time: {{item.created_time}}</p>
                <p>Final price: {{item.final_price}}</p>
              </div>
            </div>
					</div>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import u from "../modules/util";
import db from "../configs/firebase.config";

import Ticket from '../models/importTicket.model';
import Order from '../models/importOrder.model';
import Bill from '../models/bill.model';



export default {
  name: "import",
  data() {
    return {
      items: [],
      bill: [],
      detail: ''
    };
  },
  methods: {
    order(i) {
      if (!i.quantity) return;
      let a = new Order({
        items: [i]
      })
      let b = new Ticket({
        order_id: a.id,
        items: [i],
        type: 'import'
      })
      let c = new Bill({
        orderid: a.id,
        ticketid: b.id,
        items: [i]
      })
      u.setCollection('ImportOrder').create(a, doc => console.log(doc))
      u.setCollection('ImportTicket').create(b, doc => console.log(doc))
      u.setCollection('ImportBill').create(c, doc => console.log(doc))
    },
    fetchDetail(id) {
      // u.setCollection('ImportBill').getRealTime(id, doc => {
      //   this.detail = doc
      // })
      this.detail = id
    },
    checkout(id) {  
      u.setCollection('ImportBill').update(id, {
        is_done: true,
        completed_time: Date.now()
      })
    },
    cancel(id) {
      u.setCollection('ImportBill').update(id, {
        is_done: false,
        completed_time: Date.now()
      })
    }
  },
  created() {
    u.setFirebaseDB(db);
    u.setCollection("items").setOrderBy('created_time', 'desc').getAllRealTime(doc => {
      this.items = doc;
    });
    u.setCollection('ImportBill').setOrderBy('created_time', 'desc').getAllRealTime(doc => {
      this.bill = doc;
      console.log(doc)
    })
  }
};
</script>

<style>
</style>
