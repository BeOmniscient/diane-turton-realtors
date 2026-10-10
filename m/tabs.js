(function(){
  var here = document.body.getAttribute('data-tab') || '';
  var base = document.body.getAttribute('data-base') || '';
  var items = [
    ['home','index.html','Home','<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'],
    ['deck','deck.html','Deck','<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'],
    ['dash','dashboard.html','Revenue','<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
    ['report','report-card.html','Report','<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'],
    ['docs','docs.html','Docs','<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>']
  ];
  var nav = document.createElement('nav');
  nav.className = 'tabs';
  nav.setAttribute('aria-label','Sections');
  nav.innerHTML = items.map(function(i){
    return '<a href="'+base+i[1]+'"'+(i[0]===here?' aria-current="page"':'')+'><svg viewBox="0 0 24 24">'+i[3]+'</svg>'+i[2]+'</a>';
  }).join('');
  document.body.appendChild(nav);
})();
