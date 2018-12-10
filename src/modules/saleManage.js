// Usage:
// var db = firebase.firestore()
// saleManage.setFirebaseDB(db).setCollection('customers').getCustomer(id, doc => doc)
// or
// saleManage.setFirebaseDB(db).setCollection('customers').setOrderBy('_id')
// saleManage.getAllCustomers(doc => console.log(doc))

// item1[]; item2[]
// saleManage.setFirebaseDB(db).setCollection('combo')
// saleManage.createComboDeal((doc) => {}, item1, item2, ...)
import u from './util'

var saleManage = {
  incomePerEmployee: function (employeeId, callBack) { // doanh thu theo cá nhân
    if (this.checkRequiredProperty()) return;
    this.getWithOrderBy('employeeId', employeeId, callBack);
    return this;
  },
  incomePerStore: function (storeId, callBack) { // doanh thu theo cửa hàng
    if (this.checkRequiredProperty()) return;
    this.getWithOrderBy('storeId', storeId, callBack);
    return this;
  },
  getItems: function (callBack) {
    if (this.checkRequiredProperty()) return;
    this.getAll(callBack);
    return this;
  },
  getCustomer: function (customerId, callBack, error) { // 
    let that = this;
    this.setOrderBy('customerId');
    if (this.checkRequiredProperty()) return;
    this.firebaseDB
      .collection(this.collection)
      .where("customerId", "==", customerId)
      .get()
      .then(function (doc) {
        if (!docs.empty) {
          callBack(doc[0].data());
        } else {
          error(doc)
          that.noData()
        }
      })
      .catch(err => {
        error(err);
        this.error(err)
      });
    return this;
  },
  getAllCustomers: function (callBack) {
    if (this.checkRequiredProperty()) return;
    this.getAll(callBack);
    return this;
  },
  getTicketStatus: function (ticketId, callBack) {
    // get ticket status from api
    // update ticket status 
    this.firebaseDB.collection(this.collection).doc(ticketId).update({
      status: null
    })
  },
  createItemWithDiscount: function (discount, itemId) {
    this.firebaseDB.collection(this.collection).doc(itemId).update({
      discountType: discount.type,
      discountValue: discount.value
    })
  },
  createComboDeal: function (callBack, combo, ...item) {
    // model combo
    let cb = new ComboModel(combo, ...item)
    this.create(cb, callBack);
  },
  updateBill: function (billId, data) { // cập nhật hóa đơn
    this.firebaseDB.collection(this.collection).doc(billId).update(data);
  },
  // utilities
  // lập đơn hàng, phiếu xuất/nhập, báo cáo theo model
  create: function (a, callBack, error) {
    let i = Object.assign({}, a);
    console.log(i)
    this.firebaseDB.collection(this.collection).add(i).then(doc => callBack(doc.id)).catch(err => {
      error(err);
      this.error(err);
    })
    return this;
  },
  getAll: function (callBack) {
    this.firebaseDB
      .collection(this.collection)
      .orderBy(this.orderBy)
      .get()
      .then(function (docs) {
        if (!docs.empty) {
          let a = [];
          docs.forEach(doc => {
            a.push(doc.data());
          });
          callBack(a);
        }
      })
      .catch(err => this.error(err));
    return this;
  },
  getWithOrderBy: function (field, id, callBack) {
    let that = this;
    if (this.minTime && this.maxTime) {
      this.firebaseDB
        .collection(this.collection)
        .where(field, "==", id)
        .where('createdTime', '>', this.minTime)
        .where('createdTime', '<', this.maxTime)
        .orderBy(this.orderBy)
        .get()
        .then(function (docs) {
          if (!docs.empty) {
            let a = [];
            docs.forEach(doc => {
              a.push(doc.data());
            });
            callBack(a);
          } else {
            that.noData();
          }
        })
        .catch(err => this.error(err));
    } else {
      this.firebaseDB
        .collection(this.collection)
        .where(field, "==", id)
        .orderBy(this.orderBy)
        .get()
        .then(function (docs) {
          if (!docs.empty) {
            let a = [];
            docs.forEach(doc => {
              a.push(doc.data());
            });
            callBack(a);
          } else {
            that.noData()
          }
        })
        .catch(err => this.error(err));
    }
  },
  ...u
};

export default saleManage;
