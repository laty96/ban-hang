var u = {
  create: function (data, callBack) {
    let a = Object.assign({}, data);
    this.firebaseDB.collection(this.collection).add(a).then(doc => callBack(doc)).catch(err => this.error(err))
  },
  update: function (id, data) {
    this.firebaseDB.collection(this.collection).doc(id).update(data);
  },
  getWithCondition: function(con, callBack) {
    let a = this.firebaseDB.collection(this.collection)
    for (let c of con) {
      a = a.where(c.field, c.op, c.value)
    }
    a.get().then(querySnapshot => {
      let b = [];
      if (!querySnapshot.empty) {
        for (let doc of querySnapshot.docs) {
          let c = doc.data()
          c._id = doc.id
          b.push(c)
        }
        callBack(b);
      } else {
        callBack('None')
      }
    })
  },
  getWithConditionRealTime: function(con, callBack) {
    let a = this.firebaseDB.collection(this.collection)
    for (let c of con) {
      a = a.where(c.field, c.op, c.value)
    }
    a.onSnapshot(querySnapshot => {
      let b = [];
      if (!querySnapshot.empty) {
        for (let doc of querySnapshot.docs) {
          let c = doc.data()
          c._id = doc.id
          b.push(c)
        }
        callBack(b);
      } else {
        callBack('None')
      }
    })
  },
  getAll: function(callBack) {
    this.firebaseDB.collection(this.collection).orderBy(this.orderBy, 'desc').get().then(querySnapshot => {
      console.log(querySnapshot)
      if (!querySnapshot.empty) {
        let b = []
        for (let doc of querySnapshot.docs) {
          let c = doc.data()
          c._id = doc.id
          b.push(c)
        }
        callBack(b);
      } else {
        callBack('None')
      }
    })
  },
  getAllRealTime: function(callBack) {
    this.firebaseDB.collection(this.collection).orderBy(this.orderBy, this.asc).onSnapshot(querySnapshot => {
      console.log(querySnapshot)
      if (!querySnapshot.empty) {
        let b = []
        for (let doc of querySnapshot.docs) {
          let c = doc.data()
          c._id = doc.id
          b.push(c)
        }
        callBack(b);
      } else {
        callBack('None')
      }
    })
  },
  get: function (id, callBack) {
    this.firebaseDB.collection(this.collection).doc(id).get().then(doc => {
      if (doc.exists) {
        let a = doc.data()
        a._id = doc.id;
        callBack(a)
      }
    })
  },
  getRealTime: function (id, callBack) {
    this.firebaseDB.collection(this.collection).doc(id).onSnapshot(doc => {
      if (doc.exists) {
        let a = doc.data()
        a._id = doc.id;
        callBack(a)
      }
    })
  },
  delete: function (id, callBack) {
    this.firebaseDB.collection(this.collection).doc(id).set({
      is_deleted: true
    }, {
      merge: true
    }).then(doc => callBack(doc.id)).catch(err => this.error(err))
  },
  error: function (err) {
    return console.log(err);
  },
  noData: function () {
    console.log("No document found");
  },
  checkRequiredProperty: function () {
    if (!this.firebaseDB && this.firebaseDB === "null") {
      return false;
    }
    if (this.collection === null) {
      return false;
    }
    if (this.orderBy === null) {
      return false;
    }
  },
  setFirebaseDB: function (db) {
    this.firebaseDB = db;
    return this;
  },
  setCollection: function (collection) {
    this.collection = collection;
    return this;
  },
  setOrderBy: function (order, asc = 'desc') {
    this.orderBy = order;
    this.asc = asc;
    return this;
  },
  setTimeRange: function (minTime, maxTime) {
    this.minTime = minTime
    this.maxTime = maxTime
  },
  asc: null,
  firebaseDB: null,
  collection: null,
  orderBy: null,
  minTime: null,
  maxTime: null
}

export default u;
