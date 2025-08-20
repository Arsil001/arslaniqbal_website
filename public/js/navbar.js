(function(){
  const scrollTitle = document.getElementById('scrollTitle');
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll(){
    const y = window.scrollY;
    const goingUp = y < lastY;
    const beyond = y > 140;
    if(goingUp && beyond){
      scrollTitle.classList.add('show');
    }else if(!goingUp){
      scrollTitle.classList.remove('show');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
})();
