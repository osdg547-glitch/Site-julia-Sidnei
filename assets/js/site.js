/* CampusGuia — comportamento compartilhado de todas as páginas */

// Newsletter (chamado via onsubmit nos formulários)
function handleNewsletter(e){
  e.preventDefault();
  const btn=e.target.querySelector('button');
  const original=btn.textContent;
  btn.textContent='✓ Inscrito!';
  e.target.querySelector('input').value='';
  setTimeout(()=>{btn.textContent=original;},3000);
}

// Menu mobile (hambúrguer)
(function(){
  const hamburger=document.querySelector('.nav-hamburger');
  const menu=document.getElementById('mobile-menu');
  if(!hamburger||!menu)return;
  const burger='<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="pointer-events:none;"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>';
  const close='<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="pointer-events:none;"><path d="M18 6L6 18M6 6l12 12"></path></svg>';
  function shut(){menu.classList.remove('open');hamburger.setAttribute('aria-expanded','false');hamburger.innerHTML=burger;}
  hamburger.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded',open);
    hamburger.innerHTML=open?close:burger;
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',shut));
  document.addEventListener('click',(e)=>{
    if(!document.querySelector('.topbar').contains(e.target)&&!menu.contains(e.target))shut();
  });
})();

// Gaveta de busca mobile
(function(){
  const toggle=document.getElementById('search-toggle');
  const drawer=document.getElementById('mobile-search-drawer');
  const input=document.getElementById('mobile-search-input');
  if(!toggle||!drawer)return;
  toggle.addEventListener('click',()=>{
    const open=drawer.classList.toggle('open');
    if(open)setTimeout(()=>input&&input.focus(),50);
  });
  document.addEventListener('click',(e)=>{
    if(!document.querySelector('.topbar').contains(e.target)&&!drawer.contains(e.target))drawer.classList.remove('open');
  });
})();
