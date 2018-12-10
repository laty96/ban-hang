<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#menu1">Income</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Outcome</a>
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
              <td>
                <button class="btn" @click="fetchDetail(item)">Detail</button>
                <button class="btn" @click="checkout(item._id)">Checkout</button>
                <button class="btn" @click="cancel(item._id)">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Total: {{income}}</h2>
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
            <tr v-for="(item, index) in importBill" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{item.id}}</td>
              <td>{{item.total}}</td>
              <td>{{new Date(item.completed_time).toLocaleDateString()}}</td>
              <td>{{item.is_done ? 'Done' : 'Pending'}}</td>
              <td>
                <button class="btn" @click="fetchDetail(item)">Detail</button>
                <button class="btn" @click="checkout(item._id)">Checkout</button>
                <button class="btn" @click="cancel(item._id)">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Total: {{outcome}}</h2>
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
              <a
                class="btn btn-primary"
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >Items</a>
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

export default {
  name: "finance",
  data() {
    return {
      bill: [],
      importBill: [],
      detail: "",
      income: 0,
      outcome: 0
    };
  },
  created() {
    u.setFirebaseDB(db);
    u.setCollection("bills")
      .setOrderBy("created_time")
      .getAllRealTime(doc => {
        this.bill = doc;
        this.income = this.bill.reduce((acc, cur) => acc + +cur.total, 0);
      });
    u.setCollection("ImportBill")
      .setOrderBy("created_time")
      .getAllRealTime(doc => {
        this.importBill = doc;
        this.outcome = this.importBill.reduce(
          (acc, cur) => acc + +cur.total,
          0
        );
      });
  }
};
</script>

<style>
</style>
