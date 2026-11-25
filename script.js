const solutions = [
  {name:'Laptop bureautique',category:'Laptops',kind:'product',description:'Pour le travail, les études et la navigation.',icon:'▱'},
  {name:'Laptop performance',category:'Laptops',kind:'product',description:'Pour la création, la programmation et les usages intensifs.',icon:'▱'},
  {name:'Laptop reconditionné certifié',category:'Laptops',kind:'product',description:'Une solution testée pour s’équiper plus sereinement.',icon:'▱'},
  {name:'Sac pour laptop',category:'Accessoires',kind:'product',description:'Protégez et transportez votre équipement au quotidien.',icon:'▰'},
  {name:'Souris et clavier sans fil',category:'Accessoires',kind:'product',description:'Des accessoires pratiques pour un espace de travail confortable.',icon:'⌘'},
  {name:'SSD et mémoire RAM',category:'Accessoires',kind:'product',description:'Indiquez le modèle de votre appareil pour trouver la bonne référence.',icon:'▤'},
  {name:'Chargeur laptop',category:'Accessoires',kind:'product',description:'Chargeur adapté à la marque et au modèle de votre ordinateur.',icon:'ϟ'},
  {name:'Antivirus, licence 1 an',category:'Sécurité',kind:'product',description:'Une protection logicielle adaptée à votre poste.',icon:'✦'},
  {name:'Mini-routeur Wi-Fi',category:'Réseau',kind:'product',description:'Partagez votre connexion à la maison ou au bureau.',icon:'⌁'},
  {name:'Kit Starlink',category:'Réseau',kind:'product',description:'Équipement de connectivité Starlink selon votre besoin.',icon:'◉'},
  {name:'Routeur MikroTik',category:'Réseau',kind:'product',description:'Une base fiable pour les réseaux de votre activité.',icon:'⌁'},
  {name:'Maintenance informatique préventive et curative',category:'Maintenance',kind:'service',description:'Entretien du matériel, diagnostic des pannes fréquentes et réparations réalisées avec des pratiques de sécurité adaptées.',icon:'⚙',tags:['Matériel','Préventive','Curative','Diagnostic','Réparation']},
  {name:'Installation de Windows',category:'Systèmes',kind:'service',description:'Installation de Windows 7, 8, 10 ou 11 et activation selon les modalités de licence applicables.',icon:'▦',tags:['Windows 7','Windows 8','Windows 10','Windows 11','Activation']},
  {name:'Installation de Microsoft Office',category:'Bureautique',kind:'service',description:'Installation des éditions Office 2013, 2016, 2019 et 2021 avec licence authentique.',icon:'▦',tags:['Office 2013','2016','2019','2021','Licence authentique']},
  {name:'Installation de Linux',category:'Systèmes',kind:'service',description:'Installation et configuration de Debian, Ubuntu ou Kali Linux avec paquets à jour.',icon:'◈',tags:['Debian','Ubuntu','Kali Linux','Paquets à jour']},
  {name:'Installation de logiciels spécialisés',category:'Logiciels',kind:'service',description:'Installation et configuration des logiciels adaptés à votre activité et à votre licence.',icon:'▣',tags:['AutoCAD','ArchiCAD','CATIA','EPLAN','NEPLAN','Visual Paradigm','Eclipse']},
  {name:'Installation Starlink',category:'Réseau',kind:'service',description:'Pose, configuration et mise en service de votre équipement.',icon:'◉'},
  {name:'Configuration MikroTik',category:'Réseau',kind:'service',description:'Configuration de votre réseau selon vos utilisateurs et vos espaces.',icon:'⌁'},
  {name:'Portail captif et gestion des accès',category:'Réseau',kind:'service',description:'Contrôle d’accès à Internet pour vos clients ou vos équipes.',icon:'▣'}
];

const grid = document.querySelector('#product-grid');
const search = document.querySelector('#search');
const filters = [...document.querySelectorAll('.filter')];
let activeFilter = 'Tous';
const categoryIcon = {Laptops:'▱',Accessoires:'▰',Sécurité:'✦',Réseau:'⌁',Maintenance:'⚙'};
const productPhotos = [
  'photo-1496181133206-80ce9b88a853','photo-1517336714731-489689fd1ca8','photo-1588872657578-7efd1f1555ed',
  'photo-1553062407-98eeb64c6a62','photo-1527814050087-3793815479db','photo-1587202372775-e229f172b9d7',
  'photo-1583863788434-e58a36330cf0','photo-1563013544-824ae1b704d3','photo-1518770660439-4636190af475',
  'photo-1518770660439-4636190af475','photo-1519389950473-47ba0277781c','photo-1581092921461-eab62e97a780',
  'photo-1498050108023-c5249f4df085','photo-1498050108023-c5249f4df085','photo-1518770660439-4636190af475',
  'photo-1498050108023-c5249f4df085','photo-1518770660439-4636190af475','photo-1519389950473-47ba0277781c',
  'photo-1518770660439-4636190af475','photo-1519389950473-47ba0277781c'
];

function renderSolutions() {
  const query = search.value.trim().toLocaleLowerCase('fr');
  const visible = solutions.filter(item => {
    const matchesFilter = activeFilter === 'Tous' ||
      (activeFilter === 'Produits' && item.kind === 'product') ||
      (activeFilter === 'Services' && item.kind === 'service') || item.category === activeFilter;
    const matchesSearch = !query || `${item.name} ${item.category} ${item.description} ${(item.tags || []).join(' ')}`.toLocaleLowerCase('fr').includes(query);
    return matchesFilter && matchesSearch;
  });
  grid.replaceChildren();
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Aucune solution ne correspond à votre recherche. Essayez un autre mot-clé.';
    grid.append(empty);
    return;
  }
  const cards = visible.map(item => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.kind = item.kind;
    const visual = document.createElement('div');
    visual.className = `product-visual visual-${item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    visual.setAttribute('aria-hidden', 'true');
    const photo = document.createElement('img');
    photo.className = 'product-photo';
    photo.src = `https://images.unsplash.com/${productPhotos[solutions.indexOf(item)]}?auto=format&fit=crop&w=900&q=82`;
    photo.alt = '';
    photo.loading = 'lazy';
    photo.onerror = () => { photo.remove(); };
    visual.append(photo);
    const illustration = document.createElement('span');
    illustration.className = 'product-illustration';
    illustration.textContent = item.icon || categoryIcon[item.category];
    visual.append(illustration);
    const top = document.createElement('div');
    top.className = 'product-top';
    const type = document.createElement('span');
    type.className = 'product-type';
    type.textContent = item.kind === 'service' ? 'Service' : item.category;
    top.append(type);
    const title = document.createElement('h3');
    title.textContent = item.name;
    const description = document.createElement('p');
    description.textContent = item.description;
    if (item.tags?.length) {
      const tags = document.createElement('div');
      tags.className = 'solution-tags';
      item.tags.forEach(text => {
        const tag = document.createElement('span');
        tag.textContent = text;
        tags.append(tag);
      });
      article.append(visual, top, title, description, tags);
    }
    const bottom = document.createElement('div');
    bottom.className = 'product-bottom';
    const label = document.createElement('span');
    label.className = 'quote-label';
    label.textContent = 'Prix sur demande';
    const ask = document.createElement('a');
    ask.className = 'product-ask';
    ask.href = `https://wa.me/23594014632?text=${encodeURIComponent(`Bonjour TORZY DIGITAL, je souhaite des renseignements sur : ${item.name}.`)}`;
    ask.target = '_blank';
    ask.rel = 'noopener noreferrer';
    ask.setAttribute('aria-label', `Demander des renseignements sur ${item.name} via WhatsApp`);
    ask.textContent = '↗';
    bottom.append(label, ask);
    if (!item.tags?.length) article.append(visual, top, title, description);
    article.append(bottom);
    return article;
  });
  grid.append(...cards);
}

filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  renderSolutions();
}));
search.addEventListener('input', renderSolutions);
document.querySelector('#year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  nav.classList.remove('open');
}));
renderSolutions();
