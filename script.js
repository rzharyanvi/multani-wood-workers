// ---------- Preloader ----------
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(()=> pre.classList.add('hide'), 600);
});

// ---------- Cursor Glow ----------
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ---------- Header scroll ----------
window.addEventListener('scroll', ()=>{
  document.getElementById('header').classList.toggle('scrolled', window.scrollY>60);
});

// ---------- Mobile menu ----------
document.getElementById('hamburger').addEventListener('click', ()=>{
  document.getElementById('navMenu').classList.toggle('active');
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('[data-aos]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('aos-active'); });
}, {threshold:0.15});
revealEls.forEach(el=> io.observe(el));

// ---------- Counter animation ----------
const counters = document.querySelectorAll('[data-count]');
let counted = false;
const statsIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !counted){
      counted = true;
      counters.forEach(c=>{
        const target = +c.getAttribute('data-count');
        let cur = 0;
        const step = Math.max(1, target/60);
        const tick = ()=>{
          cur += step;
          if(cur < target){ c.textContent = Math.floor(cur); requestAnimationFrame(tick); }
          else c.textContent = target + '+';
        };
        tick();
      });
    }
  });
}, {threshold:0.4});
if(document.querySelector('.stats-row')) statsIO.observe(document.querySelector('.stats-row'));

// ---------- Gallery Data ----------
const catInfo = {
  doors: {label:'Doors', base:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/903138861b248ecc68a66ecd55bebfff3cd04874.jpg', alt:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/299798ff9ac5b80c80b7d4caacdd8365f205a7d8.jpg', alt2:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/1a35f579ac3f4df94558cad178f5507cb392ea44.jpg', names:['Royal Teak Main Door','Carved Panel Door','Modern Vertical Grain Door','Classic Floral Door','Solid Sal Wood Door','Designer Entrance Door'], desc:'Handcrafted from premium seasoned wood with termite-resistant polish, custom carving and brass fittings available on request.', priceRange:[9000,32000]},
  windows: {label:'Windows', base:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/28c0c3536deda1a7c068f0b21f572449c1b2f6e9.jpg', alt:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c4b44e5d6c570d5cabe7eaf5275bb99f80026e5f.jpg', alt2:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/1bb24094fa5fe0d8224c9f4cd71e69d0db1b29ce.jpg', names:['Arched Wooden Window','Casement Window Set','Traditional Grill Window','Louvered Wood Window','Bay Window Design','Panel Frame Window'], desc:'Weather and water resistant wooden windows, custom sizes with double glazing options, easy open-close hardware.', priceRange:[5000,18000]},
  kitchen: {label:'Kitchen', base:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a2f76a67c31f023e7c7f7d1b5e8312c1f2433ca2.jpg', alt:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/be214554e478ee69bd72c28158adf0d0133c16f1.jpg', alt2:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/ad491551f14f445b7de43a988ca4262382074252.jpg', names:['Modular Oak Kitchen','Island Kitchen Cabinet','L-Shape Kitchen Set','Rustic Wood Kitchen','Premium Cabinet Kitchen','Compact Kitchen Unit'], desc:'Modular kitchen cabinets built with moisture-resistant plywood, soft-close hinges, and choice of laminate or veneer finish.', priceRange:[45000,180000]},
  bed: {label:'Beds', base:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/7e6c7ac3ee27a766f0ad804a01fd94869389f9ec.jpg', alt:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/880adbf38832aee3c258c57f22559d2c8340c786.jpg', alt2:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/31f3786d2daf527a4df9d3d5a073d98ca4089b43.jpg', names:['King Size Platform Bed','Storage Double Bed','Carved Headboard Bed','Minimalist Wood Bed','Luxury Queen Bed','Rustic Solid Wood Bed'], desc:'Solid wood beds with under-storage options, hand-finished headboards and matching bedside tables available.', priceRange:[15000,55000]},
  handwashing: {label:'Wash Basin', base:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/466baa8a402c44b2abe77f71e23bac729bf2f1fb.jpg', alt:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3f8137e076fbc79af345a844f36ddf4694ebfd49.jpg', alt2:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fa9d11b917774bd2182ec667968f4b8de82feea5.jpg', names:['Wall Mounted Basin Cabinet','Mirror Basin Vanity','Compact Wash Unit','Storage Basin Cabinet','Premium Vanity Set','Double Drawer Wash Cabinet'], desc:'Waterproof coated wooden basin cabinets with mirror and ample storage, designed for daily durability.', priceRange:[6000,22000]},
  ledpanel: {label:'LED Panels', base:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2d4d0b6fed99dbc19702a293b64ac6308dcec359.jpg', alt:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/4840c4798e9fb1f2f9a50ec7527dc7d85c7f11b8.jpg', alt2:'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/0bcdcf415f5128aa894b8c80976e4af3546409fc.jpg', names:['Acoustic Slat LED Panel','TV Wall LED Panel','Ambient Wood LED Wall','Designer Wall Unit','Backlit Slat Panel','Modern Media Wall'], desc:'Wooden slat panels with integrated warm LED lighting, perfect for TV walls and living room accents.', priceRange:[700,1500]},
};

let allItems = [];
let idCounter = 0;
Object.keys(catInfo).forEach(key=>{
  const c = catInfo[key];
  const imgs = [c.base, c.alt, c.alt2];
  for(let i=1;i<=105;i++){
    const img = imgs[i % imgs.length];
    const name = c.names[i % c.names.length] + ' - Design #' + i;
    const min = c.priceRange[0], max = c.priceRange[1];
    const price = Math.floor(min + ((max-min) * ((i*37)%100))/100);
    allItems.push({id:idCounter++, cat:key, catLabel:c.label, img:img, title:name, desc:c.desc, price:price, unit: key==='ledpanel' ? '/sq.ft' : ''});
  }
});

let visibleCount = 24;
let currentFilter = 'all';
const grid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');

function renderGallery(){
  const filtered = currentFilter==='all' ? allItems : allItems.filter(i=>i.cat===currentFilter);
  const toShow = filtered.slice(0, visibleCount);
  grid.innerHTML = toShow.map(item => `
    <div class="g-card" data-id="${item.id}">
      <img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="g-overlay"><span>Click for details →</span></div>
      <div class="g-info">
        <div class="g-cat">${item.catLabel}</div>
        <div class="g-title">${item.title}</div>
        <div class="g-price">₹${item.price.toLocaleString('en-IN')}${item.unit}</div>
      </div>
    </div>
  `).join('');
  loadMoreBtn.style.display = filtered.length > visibleCount ? 'inline-block' : 'none';

  document.querySelectorAll('.g-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const item = allItems.find(i=> i.id == card.dataset.id);
      openModal(item);
    });
  });
}

function setActiveFilter(filter){
  currentFilter = filter;
  visibleCount = 24;
  document.querySelectorAll('.filter-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.filter === filter);
  });
  renderGallery();
}

renderGallery();

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> setActiveFilter(btn.dataset.filter));
});

document.querySelectorAll('.nav-filter').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    setActiveFilter(link.dataset.filter);
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
  });
});

loadMoreBtn.addEventListener('click', ()=>{
  visibleCount += 24;
  renderGallery();
});

// ---------- Item Detail Modal ----------
const modalOverlay = document.getElementById('modalOverlay');
let currentModalItem = null;

function openModal(item){
  currentModalItem = item;
  document.getElementById('modalImg').src = item.img;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalDesc').textContent = item.desc;
  document.getElementById('modalPrice').textContent = '₹' + item.price.toLocaleString('en-IN') + item.unit;
  document.getElementById('enquiryFormWrap').classList.remove('open');
  document.getElementById('enquiryForm').reset();
  document.getElementById('enquirySuccess').style.display = 'none';
  modalOverlay.classList.add('active');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e=>{ if(e.target===modalOverlay) closeModal(); });
function closeModal(){ modalOverlay.classList.remove('active'); }

document.getElementById('enquireNowBtn').addEventListener('click', ()=>{
  document.getElementById('enquiryFormWrap').classList.toggle('open');
});

// ---------- Enquiry Form submit (item modal) — sends to Formspree -> rzharyanvi@gmail.com ----------
document.getElementById('enquiryForm').addEventListener('submit', function(e){
  e.preventDefault();
  const form = e.target;
  form.querySelector('[name="_subject"]').value = 'New Enquiry: ' + (currentModalItem ? currentModalItem.title : 'General');
  form.querySelector('[name="item"]').value = currentModalItem ? currentModalItem.title + ' (₹' + currentModalItem.price.toLocaleString('en-IN') + currentModalItem.unit + ')' : 'N/A';

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {'Accept':'application/json'}
  }).then(res=>{
    document.getElementById('enquirySuccess').style.display = 'block';
    document.getElementById('enquiryFormWrap').querySelector('.enquiry-fields').style.display='none';
  }).catch(()=>{
    alert('Enquiry save nahi ho payi, kripya seedha call/whatsapp karein: +91 73578 20294');
  });
});

// ---------- Main Contact Form ----------
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {'Accept':'application/json'}
  }).then(res=>{
    alert('Dhanyawad! Aapki enquiry receive ho gayi hai. PAPPAL ji aapse jald hi contact karenge.');
    form.reset();
  }).catch(()=>{
    alert('Kuch error aaya, kripya seedha call/whatsapp karein: +91 73578 20294');
  });
});

// ---------- 3D tilt on category cards ----------
document.addEventListener('mousemove', (e)=>{
  document.querySelectorAll('.g-card:hover').forEach(card=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5;
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    card.style.transform = `translateY(-10px) rotateX(${-y*10}deg) rotateY(${x*10}deg) scale(1.02)`;
  });
});
