document.querySelector('.shortcut').addEventListener('click',()=>{
    const form = document.querySelector('.shortcut-form');
    if(!form.classList.contains('shortcut-active')){
        form.classList.add('shortcut-active');
    }else{
        form.classList.remove('shortcut-active');
    }
});

document.querySelector('.create-shortcut-btn').addEventListener('click',()=>{
    const form = {
        desc: document.querySelector('#shortcut-desc').value,
        amount: document.querySelector('#shortcut-amount').value
    }

    if(isEmpty(form.desc)||isEmpty(form.amount)){
        const old={
           i1: document.querySelector('#shortcut-desc').placeholder,
           i2: document.querySelector('#shortcut-amount').placeholder
        }
        document.querySelector('#shortcut-desc').placeholder = "Input can't be Empty!";
        document.querySelector('#shortcut-amount').placeholder = "Input can't be Empty!";
        setTimeout(()=>{
            document.querySelector('#shortcut-desc').placeholder = old.i1;
            document.querySelector('#shortcut-amount').placeholder = old.i2;
        },3*1000)
    }else{
        document.querySelector('#shortcut-desc').value = '';
        document.querySelector('#shortcut-amount').value = '';

        ls(true);
        axios.post(`/api/new-shortcut`,{
            form: form
        }).then(res=>{
            if(res.data==='success'){
                window.location.href = '/';
            }
        }).catch(err=>{
            console.log(err);
        });
    }
});

document.querySelectorAll('.shortcut-button').forEach(sc_btn=>{
    sc_btn.addEventListener('click',e=>{
        const parentTarget = e.target.parentNode;
 
        ls(true);
        axios.post(`/modify`,{
            desc: parentTarget.querySelector('h2').innerHTML,
            amount: parentTarget.querySelector('h3').innerHTML
        }).then(()=>{
            window.location.href = '/';
        }).catch(err=>{
            console.log(err);
            window.location.href = '/';
        });
    });
})

function isEmpty(str) {
    return !str.trim().length;
}
