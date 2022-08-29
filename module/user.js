const db = require('../database');

async function createAccount(data){
    const user = {
        id: data.id,
        email: data.email,
        displayName: data.displayName,
        profile: data.picture,
        cash: {
            minimal_cash : 0,
            current_cash : 0,
            maximum_cash : 0,
            accumulate_cash: 0
        },
        statement: [],
        shortcut: [],
    }
    const accountCheck = await db.collection('users').doc(user.id).get();
    if(!accountCheck.data()){
        await db.collection('users').doc(user.id).set(user);
        return true;
    }
    return true;
}

async function getAccountData(id){
    const account = await db.collection('users').doc(id).get();
    const data = account.data();
    if(data){
        const obj = {
            cash: data.cash,
            statement: data.statement,
            shortcut: data.shortcut
        }
        return obj;
    }else{
        return 'error - account not found!';
    }
}

module.exports = {
    createAccount,
    getAccountData
};
