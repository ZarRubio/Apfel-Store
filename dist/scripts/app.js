import { products, STORE, findProduct, money, whatsappUrl } from './catalog.js';

const main = document.querySelector('#main');
const icons = {
  'arrow-up-right':'<path d="M6 18 18 6M6 6h12v12"/>',
  'arrow-right':'<path d="M4 12h16M14 6l6 6-6 6"/>',
  'arrow-left':'<path d="M20 12H4m6-6-6 6 6 6"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>',
  'check':'<path d="m5 12 4 4L19 6"/>',
  'search':'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  'menu':'<path d="M4 8h16M4 16h16"/>',
  'close':'<path d="m6 6 12 12M18 6 6 18"/>',
  'share':'<path d="M12 16V3m-4 4 4-4 4 4M5 12v8h14v-8"/>',
  'shield':'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  'truck':'<path d="M2 6h12v11H2zm12 5h5l3 4v2h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  'phone':'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4M11 19h2"/>',
  'spark':'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  'whatsapp':'<path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z"/><path d="M8.2 7.5c-.8 2.6 3 6.4 5.9 7.3l1.8-1.9-2.4-1.2-1 1c-1.3-.6-2.1-1.4-2.7-2.7l.9-1.1-1.2-2.3-1.3.9Z"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons['arrow-right']}</svg>`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset = name => `/assets/${name}`;
let productState = null;
let motionObserver;
let toastTimer;
let pageAnimations = [];

function card(product, index=0){
  return `<article class="product-card reveal" style="--delay:${Math.min(index,3)*60}ms">
    <div class="card-top"><span class="condition ${product.condition==='De exhibición'?'exhibition':''}">${product.condition}</span><span class="card-line">${product.generation} ${product.line==='Base'?'':product.line}</span></div>
    <a class="card-image" href="/producto/${product.id}/" data-route aria-label="Ver ${product.name}"><img src="${asset(product.image)}" width="400" height="417" loading="lazy" alt="${product.name} en ${escapeHtml(product.colors[0].name)}"></a>
    <div class="card-body"><div class="color-dots" aria-label="Colores disponibles">${product.colors.map(c=>`<span style="--color:${c.hex}" title="${escapeHtml(c.name)}"></span>`).join('')}</div><h3><a href="/producto/${product.id}/" data-route>${product.name}</a></h3><p>${product.short}</p><div class="card-bottom"><div><span class="from">Desde</span><strong>${money(product.price)}</strong><span class="capacity-label">${product.capacities[0].label}</span></div><a class="round-link" href="/producto/${product.id}/" data-route aria-label="Elegir ${product.name}">${icon('arrow-right')}</a></div></div>
  </article>`;
}

function home(){
  const hero=products[0];
  return `<section class="hero">
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="hero-copy"><span class="eyebrow">LA EXPERIENCIA APFEL</span><h1>iPhone.<br><span>A tu manera.</span></h1><p>El modelo que quieres.<br>La atención que necesitas.</p><div class="hero-actions"><a class="button button-light" href="/catalogo/" data-route>Encuentra tu iPhone ${icon('arrow-right')}</a><a class="text-link light" href="#como-comprar">Así de fácil ${icon('chevron-down')}</a></div></div>
    <div class="hero-stage"><span class="hero-backdrop" aria-hidden="true">PRO</span><a href="/producto/${hero.id}/" data-route aria-label="Descubrir iPhone 17 Pro Max"><img class="hero-phone" src="${asset(hero.image)}" width="400" height="417" fetchpriority="high" alt="iPhone 17 Pro Max plateado"></a><div class="hero-caption"><div><span class="hero-caption-label">iPhone 17 Pro Max</span><span>Desde ${money(hero.price)}</span></div><a class="round-link round-light" href="/producto/${hero.id}/" data-route aria-label="Ver iPhone 17 Pro Max">${icon('arrow-up-right')}</a></div></div>
    <div class="hero-footnote"><span>01 / ENCUENTRA EL TUYO</span><span>Diseñado para tu día. Elegido por ti.</span></div>
  </section>
  <div class="service-strip"><span>${icon('phone')} iPhone sellados y de exhibición</span><span>${icon('whatsapp')} Asesoría por WhatsApp</span><span>${icon('truck')} Coordinamos tu entrega</span></div>
  <section class="section collection" aria-labelledby="collection-title"><div class="section-heading reveal"><div><span class="eyebrow">ELIGE TU PRÓXIMO IPHONE</span><h2 id="collection-title">El que va contigo.</h2></div><a class="text-link" href="/catalogo/" data-route>Ver todos los modelos ${icon('arrow-right')}</a></div><div class="product-grid home-grid">${products.filter(p=>p.featured).map(card).join('')}</div></section>
  <section class="editorial-section section"><div class="editorial-card reveal"><div class="editorial-copy"><span class="eyebrow">ENCUENTRA TU VERSIÓN</span><h2>Un iPhone.<br>Muchas posibilidades.</h2><p>Color, capacidad y modelo.<br>Elige los detalles que hacen que sea tuyo.</p><a class="button button-dark" href="/producto/iphone-17/" data-route>Descubre iPhone 17 ${icon('arrow-up-right')}</a></div><div class="editorial-image"><span class="editorial-orbit" aria-hidden="true"></span><img src="${asset('17-lavender.webp')}" alt="iPhone 17 en lavanda" width="400" height="417" loading="lazy"></div></div></section>
  <section class="section steps-section" id="como-comprar" aria-labelledby="steps-title"><div class="section-heading reveal"><div><span class="eyebrow">CERCA DE TI, EN CADA PASO</span><h2 id="steps-title">Así de simple.</h2></div><p>Tu compra empieza aquí.<br>La conversación sigue en WhatsApp.</p></div><div class="steps-grid"><article class="step reveal"><span class="step-number">01</span><div class="step-icon">${icon('phone')}</div><h3>Encuentra tu iPhone.</h3><p>Explora los modelos y elige el color, la capacidad y la condición que buscas.</p></article><article class="step reveal"><span class="step-number">02</span><div class="step-icon">${icon('whatsapp')}</div><h3>Conversemos.</h3><p>Recibimos tu selección y confirmamos el precio, la disponibilidad y los detalles del equipo.</p></article><article class="step reveal"><span class="step-number">03</span><div class="step-icon">${icon('truck')}</div><h3>Coordina tu entrega.</h3><p>Resuelve tus dudas con un asesor y acuerda el pago y la entrega según tu ubicación.</p></article></div></section>
  <section class="section faq-section" id="preguntas" aria-labelledby="faq-title"><div class="faq-intro reveal"><span class="eyebrow">TODO CLARO, DESDE EL INICIO</span><h2 id="faq-title">Antes de elegir.</h2><p>Las respuestas a tus primeras preguntas.</p><a class="text-link" href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">¿Tienes otra duda? ${icon('arrow-up-right')}</a></div><div class="faq-list reveal">${faqs().map(([q,a])=>`<details><summary>${q}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${a}</p></div></details>`).join('')}</div></section>
  <section class="contact-band"><div><span class="eyebrow">¿AÚN NO SABES CUÁL ELEGIR?</span><h2>Lo encontramos contigo.</h2><p>Cuéntanos qué buscas y te ayudamos a elegir tu próximo iPhone.</p></div><a class="button button-light" href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">Hablar con un asesor ${icon('whatsapp')}</a></section>`;
}

function faqs(){return [
  ['¿Cómo compro mi iPhone?','Elige un modelo, selecciona su color y capacidad y pulsa “Consultar por WhatsApp”. Un asesor confirmará la disponibilidad, el precio final y las condiciones de pago y entrega antes de que realices tu compra.'],
  ['¿Qué diferencia hay entre sellado y de exhibición?','Sellado identifica un equipo sin abrir. Un equipo de exhibición ha estado expuesto o se ha utilizado para demostración. Antes de elegir uno de exhibición, solicita fotografías reales, salud de batería, estado físico, accesorios incluidos y cobertura de garantía.'],
  ['¿Qué garantía tiene mi equipo?','La cobertura puede variar según el equipo, su origen y su condición. Solicita al asesor el plazo disponible, qué cubre y cómo recibir atención. Confirma estos detalles para la unidad elegida antes del pago.'],
  ['¿Cómo coordino el pago y la entrega?','El pago y la entrega se coordinan directamente por WhatsApp. Indica tu ciudad o distrito para confirmar cobertura, costo y plazo de envío, junto con los medios de pago disponibles.'],
  ['¿Los precios y colores están confirmados?','Esta vista previa utiliza una selección del catálogo anterior como referencia. El precio final, la disponibilidad de cada variante y los detalles del equipo se confirman con un asesor antes de comprar.']
];}

function catalog(){
  const params=new URLSearchParams(location.search);
  const query=params.get('buscar')||'';
  const condition=['Sellado','De exhibición'].includes(params.get('estado'))?params.get('estado'):'';
  return `<section class="catalog-heading section"><a class="breadcrumb" href="/" data-route>Inicio ${icon('arrow-right')} <span>iPhone</span></a><div class="catalog-heading-row"><div><span class="eyebrow">LA COLECCIÓN APFEL</span><h1>Tu iPhone está aquí.</h1><p>Encuentra el modelo que se adapta a ti.</p></div><div class="catalog-mark" aria-hidden="true">iPhone</div></div></section>
  <section class="section catalog-section"><form id="catalog-filters" class="catalog-filters" role="search"><div class="search-field">${icon('search')}<label class="sr-only" for="product-search">Buscar por modelo</label><input id="product-search" name="buscar" type="search" placeholder="Busca tu iPhone" value="${escapeHtml(query)}" autocomplete="off"></div><div class="select-field"><label class="sr-only" for="generation-filter">Generación</label><select id="generation-filter" name="generacion"><option value="">Todas las generaciones</option value="17">iPhone 17</option><option value="16">iPhone 16</option><option value="15">iPhone 15</option></select>${icon('chevron-down')}</div><div class="select-field"><label class="sr-only" for="price-sort">Ordenar modelos</label><select id="price-sort" name="orden"><option value="featured">Destacados</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select>${icon('chevron-down')}</div></form><div class="filter-meta"><div class="condition-filter" role="group" aria-label="Condición del equipo">${[['','Todos'],['Sellado','Sellados'],['De exhibición','De exhibición']].map(([v,t])=>`<button type="button" data-condition="${v}" aria-pressed="${condition===v}">${t}</button>`).join('')}</div><span id="result-count" role="status" aria-live="polite"></span></div><div id="catalog-results" class="product-grid catalog-grid"></div><div class="catalog-help"><span>${icon('whatsapp')} ¿Buscas otro modelo o capacidad?</span><a class="text-link" href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">Consúltanos ${icon('arrow-right')}</a></div></section>`;
}

function filteredProducts(filters){
  const normalized=String(filters.query||'').toLocaleLowerCase('es').trim();
  const found=products.filter(p=>(!normalized||p.name.toLocaleLowerCase('es').includes(normalized))&&(!filters.generation||p.generation===filters.generation)&&(!filters.condition||p.condition===filters.condition));
  if(filters.sort==='price-asc') found.sort((a,b)=>a.price-b.price);
  if(filters.sort==='price-desc') found.sort((a,b)=>b.price-a.price);
  return found;
}

function connectCatalog(){
  const form=document.querySelector('#catalog-filters');
  if(!form)return;
  const params=new URLSearchParams(location.search);
  const generation=document.querySelector('#generation-filter');
  const sort=document.querySelector('#price-sort');
  if(['15','16','17'].includes(params.get('generacion')))generation.value=params.get('generacion');
  if(['price-asc','price-desc'].includes(params.get('orden')))sort.value=params.get('orden');
  function update(){
    const query=document.querySelector('#product-search').value;
    const condition=document.querySelector('[data-condition][aria-pressed="true"]').dataset.condition;
    const filters={query,generation:generation.value,condition,sort:sort.value};
    const matches=filteredProducts(filters);
    document.querySelector('#result-count').textContent=`${matches.length} ${matches.length===1?'modelo':'modelos'}`;
    document.querySelector('#catalog-results').innerHTML=matches.length?matches.map(card).join(''):`<div class="empty-state">${icon('search')}<h2>No encontramos ese iPhone.</h2><p>Prueba con otro modelo o ajusta los filtros.</p><button class="button button-dark" type="button" id="clear-filters">Ver todos los modelos</button></div>`;
    document.querySelector('#clear-filters')?.addEventListener('click',()=>{form.reset();document.querySelectorAll('[data-condition]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.condition==='')));update();});
    const newParams=new URLSearchParams();
    if(query)newParams.set('buscar',query);
    if(generation.value)newParams.set('generacion',generation.value);
    if(condition)newParams.set('estado',condition);
    if(sort.value!=='featured')newParams.set('orden',sort.value);
    history.replaceState({},'',`/catalogo/${newParams.size?'?'+newParams:''}`);
    observeMotion();
  }
  form.addEventListener('submit',e=>e.preventDefault());
  form.addEventListener('input',update);
  form.addEventListener('change',update);
  document.querySelectorAll('[data-condition]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-condition]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();}));
  update();
}

function detail(product){
  const params=new URLSearchParams(location.search);
  const validIndex=(value,length)=>Number.isInteger(Number(value))&&Number(value)>=0&&Number(value)<length?Number(value):0;
  productState={product,capacity:validIndex(params.get('capacidad'),product.capacities.length),color:validIndex(params.get('color'),product.colors.length)};
  const c=product.colors[productState.color], capacity=product.capacities[productState.capacity];
  return `<div class="product-subnav"><span>${product.name}</span><a class="text-link" href="/catalogo/" data-route>Todos los iPhone ${icon('arrow-right')}</a></div><section class="section product-section"><a class="breadcrumb" href="/catalogo/" data-route>${icon('arrow-left')} Volver al catálogo</a><div class="product-layout"><div class="product-visual"><div class="product-photo"><span class="product-watermark" aria-hidden="true">${product.line==='Base'?'iPhone':'Pro.'}</span><img id="selected-product-image" src="${asset(c.image)}" alt="${product.name} en ${escapeHtml(c.name)}" width="400" height="417"><div class="photo-label">${icon('spark')}<span id="photo-color-label">${c.name}</span></div></div><p class="image-note">Imagen referencial del modelo. Consulta fotos de la unidad disponible.</p></div><div class="product-config"><span class="condition ${product.condition==='De exhibición'?'exhibition':''}">${product.condition}</span><h1>${product.name}</h1><p class="product-tagline">${product.tagline}</p><div class="product-price"><strong id="selected-price">${money(capacity.price)}</strong><span>Precio de referencia al contado</span></div><fieldset class="option-group"><legend>Color. <span id="selected-color-label">${c.name}</span></legend><div class="color-options">${product.colors.map((color,i)=>`<button type="button" class="color-option" style="--color:${color.hex}" data-color="${i}" aria-label="${color.name}" aria-pressed="${i===productState.color}"><span></span></button>`).join('')}</div></fieldset><fieldset class="option-group"><legend>Capacidad. <span>Espacio para lo que importa.</span></legend><div class="capacity-options">${product.capacities.map((cap,i)=>`<button type="button" data-capacity="${i}" aria-pressed="${i===productState.capacity}"><strong>${cap.label}</strong><span>${money(cap.price)}</span></button>`).join('')}</div></fieldset><div class="selection-summary" role="status" aria-live="polite" id="selection-summary">${capacity.label} · ${c.name} · ${product.condition}</div><a class="button button-dark product-cta" id="product-whatsapp" href="${whatsappUrl(product,productState.capacity,productState.color)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp ${icon('whatsapp')}</a><p class="purchase-note">Un asesor confirma disponibilidad, precio final y entrega.</p><button type="button" class="share-button" id="share-product">${icon('share')} Compartir este iPhone</button></div></div></section>
  <section class="section product-info"><div class="spec-summary"><div><span>Pantalla</span><strong>${product.screen}</strong></div><div><span>Chip</span><strong>${product.chip}</strong></div><div><span>Fotografía</span><strong>${product.camera}</strong></div></div><div class="product-info-grid"><div><span class="eyebrow">COMPRA CON INFORMACIÓN</span><h2>Cada detalle cuenta.</h2><p>Conoce tu equipo antes de decidir.</p></div><div class="faq-list"><details open><summary>Estado y contenido ${icon('chevron-down')}</summary><div class="faq-answer"><p>${product.condition==='De exhibición'?'Este modelo figura como equipo de exhibición. Solicita fotografías de la unidad, salud de batería, estado físico, historial de reparaciones y accesorios incluidos.':'Este modelo figura como equipo sellado. Confirma con el asesor la procedencia, versión, compatibilidad de SIM o eSIM y el contenido de la caja.'}</p></div></details><details><summary>Garantía y atención ${icon('chevron-down')}</summary><div class="faq-answer"><p>Consulta la cobertura vigente para la unidad elegida, el plazo y el procedimiento de atención. Estos detalles se confirman antes del pago.</p></div></details><details><summary>Pago y entrega ${icon('chevron-down')}</summary><div class="faq-answer"><p>Indica tu ciudad o distrito por WhatsApp. Un asesor confirmará los medios de pago, las opciones de entrega, el costo y el plazo disponible.</p></div></details></div></div></section>
  <section class="section related-section"><div class="section-heading"><div><span class="eyebrow">SIGUE EXPLORANDO</span><h2>También pueden ir contigo.</h2></div><a class="text-link" href="/catalogo/" data-route>Ver catálogo ${icon('arrow-right')}</a></div><div class="product-grid related-grid">${products.filter(p=>p.id!==product.id).slice(0,3).map(card).join('')}</div></section>
  <div class="mobile-buybar"><div><span>${product.name}</span><strong id="mobile-price">${money(capacity.price)}</strong></div><a id="mobile-whatsapp" class="button button-dark" href="${whatsappUrl(product,productState.capacity,productState.color)}" target="_blank" rel="noopener noreferrer">Consultar ${icon('whatsapp')}</a></div>`;
}

function updateSelection(){
  if(!productState)return;
  const {product,capacity,color}=productState;
  const selectedColor=product.colors[color], selectedCapacity=product.capacities[capacity];
  const photo=document.querySelector('#selected-product-image');
  const newSrc=asset(selectedColor.image);
  if(photo.getAttribute('src')!==newSrc){
    photo.src=newSrc;
    photo.alt=`${product.name} en ${selectedColor.name}`;
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)photo.animate([{opacity:.2,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'ease-out'});
  }
  document.querySelector('#selected-color-label').textContent=selectedColor.name;
  document.querySelector('#photo-color-label').textContent=selectedColor.name;
  document.querySelector('#selected-price').textContent=money(selectedCapacity.price);
  document.querySelector('#mobile-price').textContent=money(selectedCapacity.price);
  document.querySelector('#selection-summary').textContent=`${selectedCapacity.label} · ${selectedColor.name} · ${product.condition}`;
  document.querySelectorAll('[data-color]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.color)===color)));
  document.querySelectorAll('[data-capacity]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.capacity)===capacity)));
  const href=whatsappUrl(product,capacity,color);
  document.querySelector('#product-whatsapp').href=href;
  document.querySelector('#mobile-whatsapp').href=href;
  const params=new URLSearchParams({capacidad:String(capacity),color:String(color)});
  history.replaceState({},'',`/producto/${product.id}/?${params}`);
}

function connectProduct(){
  document.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{productState.color=Number(b.dataset.color);updateSelection();}));
  document.querySelectorAll('[data-capacity]').forEach(b=>b.addEventListener('click',()=>{productState.capacity=Number(b.dataset.capacity);updateSelection();}));
  document.querySelector('#share-product')?.addEventListener('click',async()=>{
    const url=location.href;
    try{
      if(navigator.share){await navigator.share({title:`${productState.product.name} · Apfel Store`,url});}
      else if(navigator.clipboard){await navigator.clipboard.writeText(url);toast('Enlace copiado. Compártelo cuando quieras.');}
      else{toast('Copia el enlace desde la barra de direcciones.');}
    }catch(error){if(error.name!=='AbortError')toast('Puedes copiar el enlace desde la barra de direcciones.');}
  });
}

function toast(message){const el=document.querySelector('.toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4000);}

function observeMotion(){
  motionObserver?.disconnect();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));return;}
  motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');motionObserver.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>{el.classList.add('will-reveal');motionObserver.observe(el);});
}

function connectMotion(){
  pageAnimations.forEach(a=>a.cancel());pageAnimations=[];
  observeMotion();
  const phone=document.querySelector('.hero-phone');
  if(!phone||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  pageAnimations.push(phone.animate([{opacity:0,transform:'translateY(28px) rotate(-4deg)'},{opacity:1,transform:'translateY(0) rotate(-4deg)'}],{duration:1000,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}));
  if('ScrollTimeline'in window){try{
    const timeline=new ScrollTimeline({source:document.documentElement,axis:'block'});
    pageAnimations.push(phone.animate([{translate:'0 0',scale:'1'},{translate:'0 90px',scale:'1.12'}],{timeline,rangeStart:'0px',rangeEnd:'700px',fill:'both'}));
  }catch{/* Basic entrance animation remains available. */}}
}

function render({focus=false}={}){
  const path=location.pathname.replace(/\/+$/,'')||'/';
  productState=null;
  document.body.classList.remove('detail-page');
  let title='Apfel Store — Tu próximo iPhone';
  if(path==='/'){main.innerHTML=home();}
  else if(path==='/catalogo'){main.innerHTML=catalog();title='Todos los iPhone · Apfel Store';connectCatalog();}
  else if(path.startsWith('/producto/')){
    const product=findProduct(path.split('/')[2]);
    if(product){main.innerHTML=detail(product);title=`${product.name} · Apfel Store`;document.body.classList.add('detail-page');connectProduct();}
    else main.innerHTML=notFound();
  }else main.innerHTML=notFound();
  document.title=title;
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  document.querySelectorAll('[data-whatsapp]').forEach(el=>el.href=whatsappUrl());
  document.querySelectorAll('.desktop-nav a,.mobile-menu a').forEach(a=>{const url=new URL(a.href);const active=!url.hash&&(url.pathname.replace(/\/+$/,'')||'/')===path;if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  closeMenu();
  connectMotion();
  if(focus)main.focus({preventScroll:true});
}

function notFound(){return `<section class="section empty-state page-not-found"><span class="eyebrow">APFEL STORE</span><h1>Busquemos tu próximo iPhone.</h1><p>Este enlace no corresponde a un equipo del catálogo.</p><a class="button button-dark" href="/catalogo/" data-route>Explorar los modelos ${icon('arrow-right')}</a></section>`;}

function closeMenu(){const button=document.querySelector('.menu-toggle');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menú');document.querySelector('#mobile-menu').hidden=true;button.innerHTML=icon('menu');}

function navigate(href){
  const url=new URL(href,location.origin);
  history.pushState({},'',url.pathname+url.search+url.hash);
  render({focus:true});
  if(url.hash)document.getElementById(url.hash.slice(1))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  else window.scrollTo({top:0,behavior:'instant'});
}

document.addEventListener('click',e=>{
  const link=e.target.closest('a[data-route]');
  if(!link||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const url=new URL(link.href,location.origin);
  if(url.origin!==location.origin)return;
  e.preventDefault();navigate(url.href);
});
document.querySelector('.menu-toggle').addEventListener('click',()=>{const button=document.querySelector('.menu-toggle');const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));button.setAttribute('aria-label',open?'Abrir menú':'Cerrar menú');button.innerHTML=icon(open?'menu':'close');document.querySelector('#mobile-menu').hidden=open;});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('popstate',()=>{render({focus:true});if(location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView();});
render();
if(location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());

// Structured access uses exactly the same product choices as the visible UI.
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  const definitions=[
    {name:'list_iphones',title:'Consultar catálogo de iPhone',description:'Read the reference catalogue. Prices and availability require seller confirmation.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){if(input&&Object.keys(input).length)throw new Error('No parameters accepted');return products.map(p=>({id:p.id,name:p.name,condition:p.condition,price:p.price,capacities:p.capacities,colors:p.colors.map(c=>c.name)}));}},
    {name:'configure_iphone',title:'Configurar un iPhone',description:'Open an iPhone and stage its color and capacity on screen. Does not send a message, reserve stock, or purchase.',inputSchema:{type:'object',properties:{productId:{type:'string'},color:{type:'string'},capacity:{type:'string'}},required:['productId'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['productId','color','capacity'].includes(k)))throw new Error('Invalid input');const p=findProduct(input.productId);if(!p)throw new Error('Product not found');const c=input.color===undefined?0:p.colors.findIndex(c=>c.name===input.color);const s=input.capacity===undefined?0:p.capacities.findIndex(c=>c.label===input.capacity);if(c<0||s<0)throw new Error('Variant not in catalogue');navigate(`/producto/${p.id}/?color=${c}&capacidad=${s}`);return {product:p.name,color:p.colors[c].name,capacity:p.capacities[s].label,referencePrice:p.capacities[s].price,status:'staged',whatsappUrl:whatsappUrl(p,s,c)};}}
  ];
  definitions.forEach(tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}});
}
