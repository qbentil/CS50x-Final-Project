const go = document.getElementById('go');
const showLevel = document.getElementById('sLevel');
const s_level = document.getElementById('s-level');
setlevel = (e) =>{
    var level = e.getAttribute("id")
    // console.log(level);
    localStorage.setItem('selectedLevel', level);
    // showLevel.innerHTML = level;
    s_level.innerHTML = level;
    go.style.display = "block";
    // e.style.color = "#fff"
    // window.location.assign('game.html')
}

goto = (e) =>{
    window.location.assign(e+'.html')
}

