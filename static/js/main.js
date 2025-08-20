(function(){
  const body=document.body; const heroImage=document.getElementById('hero-image');
  function onScroll(){ const scrolled=window.scrollY>60; body.classList.toggle('scrolled', scrolled); if(heroImage){ heroImage.style.transform=`translateY(${window.scrollY*0.45}px)`; } }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  window.addEventListener('DOMContentLoaded',()=>{ document.querySelectorAll('.reveal').forEach(el=>{ void el.offsetWidth; el.style.visibility='visible'; }); });
  const searchToggle=document.getElementById('search-toggle'); const searchBar=document.getElementById('search-bar'); const searchClose=document.getElementById('search-close');
  if(searchToggle&&searchBar) searchToggle.addEventListener('click',()=>searchBar.classList.toggle('hidden')); if(searchClose&&searchBar) searchClose.addEventListener('click',()=>searchBar.classList.add('hidden'));
  const menuOpenBar=document.getElementById('menu-open-bar'); const menuOpen=document.getElementById('menu-open'); const mobileMenu=document.getElementById('mobile-menu'); const mobileOverlay=document.getElementById('mobile-overlay'); const menuClose=document.getElementById('menu-close');
  function openMenu(){ mobileMenu?.classList.remove('hidden'); } function closeMenu(){ mobileMenu?.classList.add('hidden'); }
  [menuOpenBar,menuOpen].forEach(btn=>btn&&btn.addEventListener('click', openMenu)); [menuClose,mobileOverlay].forEach(el=>el&&el.addEventListener('click', closeMenu));
  const observer=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('animate'); }); },{threshold:.1, rootMargin:'50px'});
  document.querySelectorAll('.fade-in-up').forEach(el=>observer.observe(el));
  fetch('/trickle/assets/hero-image.json').then(r=>r.json()).then(d=>{ if(d?.url) heroImage.src=d.url; }).catch(()=>{});
  const productFiles=[
    {file:'ocean-waves.json',title:'Ocean Waves',artist:'Anna Landstedt',price:'$120'},
    {file:'urban-architecture.json',title:'Urban Architecture',artist:'Cal Foster',price:'$95'},
    {file:'forest-path.json',title:'Forest Path',artist:'Caley Vanular',price:'$110'},
    {file:'desert-landscape.json',title:'Desert Landscape',artist:'Clare Plueckhahn',price:'$135'},
    {file:'city-nights.json',title:'City Nights',artist:'David Zammit',price:'$150'},
    {file:'mountain-vista.json',title:'Mountain Vista',artist:'Iman Perdana',price:'$125'}
  ];
  Promise.all(productFiles.map(p=>fetch(`/trickle/assets/${p.file}`).then(r=>r.json()).then(j=>({...p,image:j.url})).catch(()=>({...p,image:""})))).then(items=>{
    const grid=document.getElementById('products-grid'); if(!grid) return;
    grid.innerHTML=items.map((product,idx)=>`<div class="product-card group cursor-pointer fade-in-up" style="animation-delay:${idx*0.1}s">
      <div class="relative overflow-hidden bg-gray-100 aspect-[4/5] mb-4 rounded-lg">
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <i class="icon-heart text-2xl mb-2"></i>
          <p class="text-sm font-light">View Details</p>
        </div>
      </div>
      <div class="space-y-1">
        <h3 class="font-medium text-lg group-hover:text-gray-700 transition-colors">${product.title}</h3>
        <p class="text-gray-600 text-sm">by ${product.artist}</p>
        <p class="font-medium">${product.price}</p>
      </div>
    </div>`).join('');
    grid.querySelectorAll('.fade-in-up').forEach(el=>observer.observe(el));
  }).catch(()=>{});
})();




// Theme toggle (sun/moon) for both overlay and sticky headers
(function(){
  const root = document.documentElement;
  const sets = [
    {btn: 'theme-toggle', moon: 'icon-moon', sun: 'icon-sun'},
    {btn: 'theme-toggle-2', moon: 'icon-moon-2', sun: 'icon-sun-2'},
  ];
  function setTheme(mode){
    if(mode === 'dark'){ root.classList.add('dark'); }
    else{ root.classList.remove('dark'); }
    // sync icons
    sets.forEach(s => {
      const moon = document.getElementById(s.moon);
      const sun = document.getElementById(s.sun);
      if(!moon || !sun) return;
      if(root.classList.contains('dark')){
        sun.classList.remove('hidden'); moon.classList.add('hidden');
      }else{
        sun.classList.add('hidden'); moon.classList.remove('hidden');
      }
    });
  }
  const stored = localStorage.getItem('theme');
  if(stored){ setTheme(stored); }
  else{ setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  sets.forEach(s => {
    const btn = document.getElementById(s.btn);
    if(!btn) return;
    btn.addEventListener('click', function(){
      const next = root.classList.contains('dark') ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('theme', next);
    });
  });
})();

// Scroll-up centered title reveal with hysteresis
(function(){
  const title = document.getElementById('scrollTitle');
  const brandLeft = document.getElementById('brandLeft');
  if(!title) return;
  let lastY = window.scrollY;
  let shown = false;
  const THRESH = 70, HYST = 12;
  function onScroll(){
    const y = window.scrollY;
    const up = y < lastY;
    const beyond = y > (THRESH + (shown ? -HYST : HYST));
    if(up && beyond && !shown){
      title.classList.add('show');
      brandLeft && brandLeft.classList.add('dim');
      shown = true;
    } else if((!up || !beyond) && shown){
      title.classList.remove('show');
      brandLeft && brandLeft.classList.remove('dim');
      shown = false;
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();