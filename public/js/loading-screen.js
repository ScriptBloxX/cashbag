const loadingScreen = document.querySelector('.loading-screen');
async function ls(val){
    if(val) return loadingScreen.classList.remove('hide');
    return loadingScreen.classList.add('hide');
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      ls(false);
    }
};
