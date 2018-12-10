<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#menu1">Order report</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Income report</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu3">In/out report</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu4">Export/inport</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu5">Summary</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content mt-1">
      <div id="menu1" class="container tab-pane active">
        {{order}}
      </div>
      <div id="menu2" class="container tab-pane">
        {{bill}}
      </div>
      <div id="menu3" class="container tab-pane">
        {{pay}}
      </div>
      <div id="menu4" class="container tab-pane">
        {{_export}}
        {{_import}}
      </div>
      <div id="menu5" class="container tab-pane">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script>
import u from "../modules/util";
import db from "../configs/firebase.config";
  
export default {
  name: 'report',
  data() {
    return {
      item: '',
      order: '',
      pay: '',
      _export: '',
      _import: '',
      bill:''
    }
  }, 
  methods: {

  },
  created() {
    u.setFirebaseDB(db)
    u.setCollection('orders').setOrderBy('created_time', 'desc').getAllRealTime(doc => this.order = doc)
    u.setCollection('bills').setOrderBy('created_time', 'desc').getAllRealTime(doc => this.bill = doc)
    u.setCollection('ImportBill').setOrderBy('created_time').getAllRealTime(doc => this.pay = doc)
    u.setCollection('tickets').setOrderBy('created_time').getAllRealTime(doc => this._export = doc)
    u.setCollection('ImportTicket').setOrderBy('created_time').getAllRealTime(doc => this._import = doc)
    u.setCollection('items').setOrderBy('created_time').getAllRealTime(doc => this.item = doc)

    
  }
}
</script>
<style>
  
</style>