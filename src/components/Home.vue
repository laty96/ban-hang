<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu1">Cart</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Combo</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content mt-1">
      <div id="home" class="container tab-pane active">
        <div class="row d-flex justify-content-around">
          <div class="card col-md-3 m-2" v-for="(item, index) in items" :key="index">
            <div class="card-body">
              <h4 class="card-title">{{item.name}}</h4>
              <p>Price: {{item.price}}</p>
              <p>Stock: {{item.stock}}</p>
              <p>Discount percent: {{item.discount_percent}}%</p>
              <p>Discount value: {{item.discount_value}}</p>
              <button class="btn" @click="add(item)">Add to cart</button>
            </div>
          </div>
        </div>
        <button class="btn" @click="more()">More</button>
      </div>
      <div id="menu1" class="container tab-pane">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{item.name}}</td>
              <td>{{item.price}}</td>
              <td>
                <input type="number" v-model="item.quantity" min="1" :max="item.stock">
              </td>
              <td>
                <button class="btn" @click="remove(index)">&times;</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn" @click="buy()">Buy</button>
      </div>
      <div id="menu2" class="container tab-pane">
        <div class="row d-flex justify-content-around">
          <div class="card col-md-3 m-2" v-for="(item, index) in combo" :key="index">
            <div class="card-body">
              <h4 class="card-title">{{item.name}}</h4>
              <p>Price: {{item.price}}</p>
              <p>Stock: {{item.stock}}</p>
              <p>Discount percent: {{item.discount_percent}}%</p>
              <p>Discount value: {{item.discount_value}}</p>
              <p><a class="btn btn-primary" data-toggle="collapse" :href="'#'+item.id" role="button" aria-expanded="false" :aria-controls="item.id">
                Items:
              </a> </p>
              <div class="collapse" :id="item.id">
                <div class="card card-body m-1" v-for="(item, index) in item.items" :key="index">
                  <p>Name: {{item.name}}</p>
                  <p>Price: {{item.price}}</p>
                  <p>Discount percent: {{item.discount_percent}}%</p>
                  <p>Discount value: {{item.discount_value}}</p>
                  <p>Stock: {{item.stock}}</p>
                  <p>Final price: {{item.final_price}}</p>
                </div>
              </div>
              <button class="btn" @click="add(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketModel from "../models/ticket.model";
import OrderModel from "../models/order.model";

import BillModel from "../models/bill.model";

import saleManage from "../modules/saleManage";
import db from "../configs/firebase.config";

export default {
  name: "home",
  data() {
    return {
      items: [],
      limit: 0,
      collection: "exportTickets",
      cart: [],
      combo: [],
    };
  },
  methods: {
    add(item) {
      let count = 0;
      for (let i of this.cart) {
        if (i.id == item.id) {
          count++;
        }
      }
      item.quantity = 1;
      if (count == 0) this.cart.push(item);
    },
    remove(index) {
      this.cart.splice(index, 1);
    },
    buy() {
      let a = new OrderModel({
        items: this.cart
      });
      let b = new TicketModel({
        items: this.cart,
        order_id: a.id,
        type: 'export'
      });
      let c = new BillModel({
        items: this.cart,
        orderid: a.id,
        ticketid: b.id,
      })
      saleManage.setFirebaseDB(db)
      saleManage.setCollection("orders")
        .create(a, doc => {
          console.log(doc);
        });
      saleManage
        .setCollection("tickets")
        .create(b, doc => {
          console.log(doc);
        });
      saleManage.setCollection('bills').create(c, doc => {
        console.log(doc)
      })
      this.cart = []
    },
    more() {
      this.limit += 10;
      this.getItem();
    },
    getItem() {
      saleManage
        .setFirebaseDB(db)
        .setCollection("items")
        .setOrderBy("created_time")
        .getWithConditionRealTime([{field: 'stock', op: '>', value: 0}], docs => {
          this.items = docs;
          console.log(docs);
        });
    }
  },
  created() {
    this.getItem();
    saleManage.setFirebaseDB(db).setCollection('combo').setOrderBy('created_time').getWithConditionRealTime([{field: 'stock', op: '>', value: 0}], doc => {
      this.combo = doc
      console.log(doc)
    })
  }
};
</script>

<style>
</style>
