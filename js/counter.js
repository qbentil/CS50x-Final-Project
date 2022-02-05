const year = document.getElementById('year');
year.innerHTML = new Date().getFullYear();

goto = (e) =>{
    window.location.assign(e+'.html')
}