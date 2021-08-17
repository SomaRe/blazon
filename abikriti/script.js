window.addEventListener('scroll', e => {
    var topPattern=document.querySelector('.top-pattern');
    var bottomPattern = document.querySelector('.bottom-pattern');
    topPattern.style.backgroundPosition = scrollY/10+"px";
    bottomPattern.style.backgroundPosition = scrollY/10+"px";
})