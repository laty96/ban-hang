import u from './util'

var StorageManage = {
    confirmItemTicket: function(ticketId) { // xác nhận phiếu xuất/nhập kho
        this.firebaseDB.collection(this.collection).doc(ticketId).update({
            confirmed: true
        })
    }, 
    createBill: function (bill, callBack) {
        // bill: model hóa đơn
        let b = Object.assign({}, bill);
        this.create(b, callBack);
        return this;
    },
    getReport: function(type, callBack) {
        this.firebaseDB.collection(this.collection).where('type', '==', type).get().then(docs => {
            if (!docs.empty) {
                let a = [];
                docs.forEach(doc => {
                    a.push(doc.data());
                });
                callBack(a)
            }
        })
    },
    ...u
}

export default StorageManage;