const db = require('../database');
const { firestore, app } = require('firebase-admin');
const FieldValue = firestore.FieldValue;

async function cash_modify(id,modify_data){
    const doc = db.collection('users').doc(id);
    const getDoc = await doc.get();
    const data = getDoc.data();

    if(data){
        const getDate = new Date()

        const statement_obj = {
            date: getDate.getDate() + '/' + parseInt(getDate.getMonth()+1) + '/' + getDate.getFullYear(),
            desc: modify_data.desc,
            amount: modify_data.amount,
            current: Number(modify_data.amount)+Number(data.cash.current_cash),
        }
        
        // cash change
        var minimal_cash = data.cash.minimal_cash;
        var maximum_cash = data.cash.maximum_cash;

        if(Number(data.cash.current_cash)+Number(modify_data.amount) < data.cash.current_cash){
            minimal_cash = Number(data.cash.current_cash)+Number(modify_data.amount);
        }
        if(Number(modify_data.amount)+Number(data.cash.current_cash) > maximum_cash){
            maximum_cash = parseInt(modify_data.amount)+parseInt(data.cash.current_cash)
        }

        // update
        return await doc.update({
            'statement': FieldValue.arrayUnion(statement_obj),
            'cash': {
                minimal_cash: minimal_cash,
                current_cash: data.cash.current_cash + Number(modify_data.amount),
                maximum_cash: maximum_cash,
                accumulate_cash: data.cash.accumulate_cash + Math.abs(modify_data.amount),
            }
        }).then(() => {
            return 'success';
        });
    }else{
        return 'error - account not found!';
    }
}

async function create_shortcut(id,shortcut_data){
    const doc = db.collection('users').doc(id);
    const getDoc = await doc.get();
    const data = getDoc.data();
    if(data){
        return await doc.update({
            'shortcut': FieldValue.arrayUnion(shortcut_data),
        }).then(() => {
            return 'success';
        });
    }else{
        return'error - account not found!'
    }
}

module.exports = {
    cash_modify,
    create_shortcut
}
