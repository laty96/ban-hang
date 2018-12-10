<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu1">User Info</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Report</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu3">Combo</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div id="home" class="container tab-pane active">
        <br>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">product name</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="text"
              placeholder
              class="form-control input-md"
              v-model="item.name"
            >
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">price - unit</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="text"
              placeholder
              class="form-control input-md"
              v-model="item.price"
            >
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">stock</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="item.stock"
            >
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Discount percent</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="item.discount_percent"
            >
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Discount Value</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="item.discount_value"
            >
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="singlebutton"></label>
          <div class="col-md-4">
            <button id="singlebutton" name="singlebutton" class="btn btn-success" @click="add()">add</button>
          </div>
        </div>
      </div>
      <div id="menu1" class="container tab-pane fade">
        <br>
        <!-- tab2 -->
        <ul class="list-group">
          <li class="list-group-item" v-for="user in users" :key="user.id">{{user.name}}</li>
        </ul>
      </div>
      <div id="menu2" class="container tab-pane fade">
        <br>
        <!-- tab3 -->
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <th scope="row">{{index}}</th>
              <td>{{report.name}}</td>
              <td>{{report.title}}</td>
              <td>{{report.price}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container tab-pane fade" id="menu3">
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Name</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="text"
              placeholder
              class="form-control input-md"
              v-model="combo.name"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Price</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="combo.price"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">stock</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="combo.stock"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Items</label>
          <div class="col-md-4">
            <select v-model="combo.items" class="form-control custom-select" multiple>
              <option :value="item" v-for="(item, index) in items" :key="index">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Discount percent</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="combo.discount_percent"
            >
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Discount Value</label>
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="number"
              placeholder
              class="form-control input-md"
              v-model="combo.discount_value"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="singlebutton"></label>
          <div class="col-md-4">
            <button
              id="singlebutton"
              name="singlebutton"
              class="btn btn-success"
              @click="addCombo()"
            >add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import saleManage from "../modules/saleManage";
import u from "../modules/util";

import db from "../configs/firebase.config";
import Combo from '../models/combo.model';

export default {
  name: "sale",
  data() {
    return {
      item: {
        name: "",
        price: "",
        stock: "",
        discount_percent: "",
        discount_value: ""
      },
      users: [],
      reports: [],
      items: '',
      combo: {
        name: '',
        stock: '',
        price: '',
        items: [],
        discount_percent: "",
        discount_value: ""
      }
    };
  },
  methods: {
    add() {
      let a  = new Item(this.item)
      saleManage.setFirebaseDB(db).setCollection('items').create(a, doc => console.log(doc), err => console.log(err))
      this.reset()
    },
    reset() {
      this.item = {
        name: "",
        price: "",
        stock: "",
        discount_percent: "",
        discount_value: ""
      }
      this.combo = {
        name: '',
        stock: '',
        price: '',
        items: [],
        discount_percent: "",
        discount_value: ""
      }
    },
    addCombo() {
      let a = new Combo(this.combo)
      console.log(a)
      u.setCollection('combo').create(a, doc => console.log(doc), err => console.log(err))
      this.reset()
    }
  },
  created() {
    u.setFirebaseDB(db)
    u.setCollection('items').setOrderBy('created_time').getAllRealTime(doc => {this.items = doc;
    console.log(doc)})
  },
  mounted() {
    // saleManage
    //   .setFirebaseDB(db)
    //   .setCollection("reports")
    //   .setOrderBy("createdTime")
    //   .setTimeRange(new Date(Date.now() - 86400000), Date.now())
    //   .getWithOrderBy("id", 1, doc => this.reports = doc);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => (this.users = json));
  }
};
</script>

<style>
</style>
