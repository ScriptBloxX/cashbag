const menu = document.querySelector('.menu');
const menu_btn = document.querySelector('.menu-button');

// menu active
document.querySelectorAll('.menu-btn').forEach(menu_btn_=>{
    menu_btn_.addEventListener('click',(btn)=>{
        const btn_id = btn.target.id;

        document.querySelectorAll('.view_container').forEach(e=>{
            if(e.classList.contains(btn_id)){
                e.classList.add('active');
                menu.classList.remove('menu-active');
                menu_btn.classList.remove('menu-button-active');
            }else{
                e.classList.remove('active');
            }
        });
        document.querySelectorAll('.menu-btn').forEach(e=>{
            if(e.id===btn_id){
                e.classList.add('menu-active');
            }else{
                e.classList.remove('menu-active');
            }
        });

    });
});

// open,close menu btn
menu_btn.addEventListener('click',()=>{
    if(menu.classList.contains('menu-active')){
        menu.classList.remove('menu-active');
        menu_btn.classList.remove('menu-button-active');
    }else{
        menu.classList.add('menu-active');
        menu_btn.classList.add('menu-button-active');
    }
});
