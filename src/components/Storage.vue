<template>
	<div class="container">
		 <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#export">Export</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#import">Import</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#item-info">Info</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content mt-1">
      <div id="export" class="container tab-pane active">
				<table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Created Date</th>
              <th scope="col">Completed Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr role="button" v-for="(tic, index) in ticket" :key="index" 
						>
              <th scope="row">{{index + 1}}</th>
              <td>{{tic.id}}</td>
              <td>{{new Date(tic.created_time).toLocaleDateString()}}</td>
              <td>{{new Date(tic.completed_time).toLocaleDateString()}}
              </td>
							<td>{{tic.is_confirmed}}</td>
              <td><button class="btn btn-primary"	@click="fetchOrder(tic.order_id, index)">Detail</button>
              <button class="btn btn-primary" @click="confirmTicket(tic)" v-if="!tic.is_confirmed">Confirm</button>
              <button class="btn btn-primary" @click="rejectTicket(tic)" v-if="tic.is_confirmed">Reject</button></td>
            </tr>
          </tbody>
        </table>
				<div class="card" v-if="order">
          <div class="card-header">
						<h3>Order ID: {{order.id}}</h3>
          </div>
					<div class="card-body">
            <p>Name: {{order.name}}</p>
            <p>Date: {{order.created_time}}</p>
            <p>Employee: {{order.employee_id}}</p>
            <p>Status: {{order.is_done ? 'Done' : 'Pending'}}</p>
            <p>
              <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Items
              </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body m-1" v-for="(item, index) in order.items" :key="index">
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
			<div id="import" class="container tab-pane">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Created Date</th>
              <th scope="col">Completed Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr role="button" v-for="(tic, index) in importTicket" :key="index" 
						>
              <th scope="row">{{index + 1}}</th>
              <td>{{tic.id}}</td>
              <td>{{new Date(tic.created_time).toLocaleDateString()}}</td>
              <td>{{new Date(tic.completed_time).toLocaleDateString()}}
              </td>
							<td>{{tic.is_confirmed}}</td>
              <td><button class="btn btn-primary"	@click="fetchImportOrder(tic.order_id, index)">Detail</button>
              <button class="btn btn-primary" @click="confirmImportTicket(tic)" v-if="!tic.is_confirmed">Confirm</button>
              <button class="btn btn-primary" @click="rejectImportTicket(tic)" v-if="tic.is_confirmed">Reject</button></td>
            </tr>
          </tbody>
        </table>
				<div class="card" v-if="order">
          <div class="card-header">
						<h3>Order ID: {{order.id}}</h3>
          </div>
					<div class="card-body">
            <p>Name: {{order.name}}</p>
            <p>Date: {{order.created_time}}</p>
            <p>Employee: {{order.employee_id}}</p>
            <p>Status: {{order.is_done ? 'Done' : 'Pending'}}</p>
            <p>
              <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Items
              </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body m-1" v-for="(item, index) in order.items" :key="index">
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
      <div id="item-info" class="container tab-pane">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Completed Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr role="button" v-for="(tic, index) in ticket" :key="index" 
						>
              <th scope="row">{{index + 1}}</th>
              <td>{{tic.id}}</td>
              <td>{{new Date(tic.created_time).toLocaleDateString()}}</td>
              <td>{{new Date(tic.completed_time).toLocaleDateString()}}
              </td>
							<td>{{tic.is_confirmed}}</td>
              <td><button class="btn btn-primary"	@click="fetchOrder(tic.order_id, index)">Detail</button>
              <button class="btn btn-primary" @click="confirmTicket(tic)" v-if="!tic.is_confirmed">Confirm</button>
              <button class="btn btn-primary" @click="rejectTicket(tic)" v-if="tic.is_confirmed">Reject</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
	</div>
</template>

<script>
import storageManage from "../modules/storageManage";
import db from "../configs/firebase.config";
import Bill from '../models/bill.model';
import { storage } from 'firebase';

export default {
	name: 'Storage',
	data() {
		return {
      ticket: [],
      importTicket: [],
			order: ''
		}
	},
	methods: {
		fetchOrder(id, index) {
			storageManage.setCollection('orders').getWithCondition([{field: 'id', op: '==', value: id}], doc => {
        this.order = doc[0];
        console.log(doc)
			})
    },
    fetchImportOrder(id, index) {
			storageManage.setCollection('ImportOrder').getWithCondition([{field: 'id', op: '==', value: id}], doc => {
        this.order = doc[0];
        console.log(doc)
			})
    },
    confirmTicket(tic) {
      storageManage.setCollection('tickets').update(tic._id, {
        is_confirmed: true,
        completed_time: Date.now()
      })
      storageManage.setCollection('orders').getWithCondition([{field: 'id', op: '==', value: tic.order_id}], doc => {
				storageManage.setCollection('orders').update(doc[0]._id, {
          is_done: true,
          completed_time: Date.now()
        })
			})
      storageManage.setCollection('bills').getWithCondition([{field: 'ticketid', op: '==', value: tic.id}], doc => {
        console.log(doc)
      })
    },
    rejectTicket(tic) {
      storageManage.setCollection('tickets').update(tic._id, {
        is_confirmed: false,
        completed_time: Date.now()
      })
      storageManage.setCollection('orders').getWithCondition([{field: 'id', op: '==', value: tic.order_id}], doc => {
				storageManage.setCollection('orders').update(doc[0]._id, {
          is_done: false,
          completed_time: Date.now()
        })
			})
      storageManage.setCollection('bills').getWithCondition([{field: 'ticketid', op: '==', value: tic.id}], doc => {
        console.log(doc)
      })
    },
    confirmImportTicket(tic) {
      storageManage.setCollection('ImportTicket').update(tic._id, {
        is_confirmed: true,
        completed_time: Date.now()
      })
      storageManage.setCollection('ImportOrder').getWithCondition([{field: 'id', op: '==', value: tic.order_id}], doc => {
				storageManage.setCollection('ImportOrder').update(doc[0]._id, {
          is_done: true,
          completed_time: Date.now()
        })
			})
      storageManage.setCollection('ImportBill').getWithCondition([{field: 'ticketid', op: '==', value: tic.id}], doc => {
        console.log(doc)
      })
    },
    rejectImportTicket(tic) {
      storageManage.setCollection('ImportTicket').update(tic._id, {
        is_confirmed: false,
        completed_time: Date.now()
      })
      storageManage.setCollection('ImportOrder').getWithCondition([{field: 'id', op: '==', value: tic.order_id}], doc => {
				storageManage.setCollection('ImportOrder').update(doc[0]._id, {
          is_done: false,
          completed_time: Date.now()
        })
			})
      storageManage.setCollection('ImportBill').getWithCondition([{field: 'ticketid', op: '==', value: tic.id}], doc => {
        console.log(doc)
      })
    }
	},
	created() {	
    storageManage.setFirebaseDB(db)
		storageManage.setCollection('tickets').getWithConditionRealTime([{field: 'type', op: '==', value: 'export'}], doc => {
      this.ticket = doc;
      console.log(doc)
    })
    storageManage.setCollection('ImportTicket').setOrderBy('created_time', 'desc').getAllRealTime(doc => {
      if (doc != 'None') {
        this.importTicket = doc;
        console.log(doc)
      }
		})
	}
}
</script>

<style>

</style>
