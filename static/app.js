(() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value || '') ? value : '#';
  const link = (url, label, external = true) => '<a href="'+escape(safeURL(url))+'"'+(external ? ' target="_blank" rel="noopener noreferrer"' : '')+'>'+escape(label)+'</a>';
  function inline(text) {
    return String(text).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map(part => {
      if (part.startsWith('**') && part.endsWith('**')) return '<strong>'+escape(part.slice(2,-2))+'</strong>';
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      return match ? link(match[2],match[1]) : escape(part);
    }).join('');
  }
  const names = {about:'About',research:'Research',publications:'Publications',projects:'Projects',blogs:'Blogs',experience:'Experience'};
  const groups = [{id:'efficient',title:'Efficient AI'},{id:'discovery',title:'AI for Simulation'},{id:'hci',title:'Early days: HCI (penetrative AI)'}];
  const collapsedGroups = new Set(groups.map(group => group.id));
  const expandedSummaries = new Set();
  function researchPaper(item, data, className = '') {
    const paper = item.paper ? data.research.publications.find(p => p.paper === item.paper) : null;
    const title = paper?.title || item.title || item.label;
    const venue = paper ? (paper.venue.toLowerCase() === 'preprint' ? '' : paper.venue.replace(/ Poster$/, '')) : 'ongoing';
    const label = paper ? '<a href="'+escape(safeURL(paper.paper))+'" target="_blank" rel="noopener noreferrer" title="'+escape(title)+'" aria-label="'+escape(item.label+': '+title)+'">'+escape(item.label)+'</a>' : '<span title="'+escape(title)+'">'+escape(item.label)+'</span>';
    return '<div class="research-paper '+className+'"><span class="research-paper-name">'+label+'</span>'+(venue ? '<span class="research-venue'+(!paper ? ' is-ongoing' : '')+'">'+escape(venue)+'</span>' : '')+'</div>';
  }
  function socialSimulation(data) {
    const config = data.socialsim;
    return '<section class="social-roadmap-section" aria-labelledby="social-roadmap-heading"><div class="roadmap-section-heading"><h2 id="social-roadmap-heading">Social Simulation</h2><p class="simulation-statement">'+escape(config.headline)+'</p></div>'+
      '<div class="roadmap-scroll" tabindex="0" role="region" aria-label="Social simulation: How to Evaluate connects to How to Build, with Individuals, Organizations, and Evolve branches."><div class="social-roadmap">'+
      '<svg class="roadmap-lines" viewBox="0 0 732 470" preserveAspectRatio="none" aria-hidden="true"><path class="roadmap-grid" d="M220 86 H732 M32 200 H732 M220 310 H732 M220 388 H732"/><path class="roadmap-road" d="M12 36 V244 M160 36 H196 V114 H208 M196 36 H208 M160 244 H196 V412 M196 244 H208 M196 334 H208 M196 412 H208"/><circle class="roadmap-stop" cx="12" cy="36" r="5"/><circle class="roadmap-stop" cx="12" cy="244" r="5"/></svg>'+
      '<div class="roadmap-evaluation"><h3>How to Evaluate</h3><ul class="roadmap-evaluation-groups">'+config.evaluation.map(item=>'<li><h4>'+escape(item.category)+'</h4>'+researchPaper(item,data)+'</li>').join('')+'</ul></div><h3 class="roadmap-building">How to Build</h3><ul class="roadmap-branches">'+
      config.branches.map((branch,index)=>'<li class="roadmap-branch roadmap-branch-'+index+'"><h4>'+escape(branch.label)+'</h4><div class="roadmap-papers">'+branch.papers.map(item=>researchPaper(item,data)).join('')+'</div></li>').join('')+
      '</ul></div></div></section>';
  }
  function modeling(data) {
    const config = data.modeling;
    return '<section class="language-models modeling-direction" id="language-models" aria-labelledby="language-models-heading"><h2 id="language-models-heading">'+escape(config.heading)+'</h2><ul class="model-map">'+
      config.methods.map(item=>'<li class="model-map-row"><h3>'+escape(item.category)+'</h3><div class="model-map-papers">'+researchPaper(item,data)+'</div></li>').join('')+
      '<li class="model-map-row"><h3>Evaluation</h3><div class="model-map-papers">'+config.evaluation.map(item=>researchPaper(item,data)).join('')+'</div></li></ul></section>';
  }
  function publication(item, index) {
    const id = 'paper-summary-'+index;
    const expanded = expandedSummaries.has(item.paper);
    return '<article class="publication"><h3>'+link(item.paper,item.title)+'</h3><p class="publication-authors">'+authors(item)+'</p><div class="publication-meta"><span>'+escape(item.venue)+'</span><span class="paper-links">'+
      (item.tldr ? '<button type="button" class="text-toggle tldr-toggle" aria-expanded="'+expanded+'" aria-controls="'+id+'" aria-label="TL;DR: '+escape(item.title)+'" data-paper="'+escape(item.paper)+'">tl;dr</button>' : '')+
      ['code','dataset','project'].filter(key=>item[key]).map(key=>link(item[key],key)).join('')+'</span></div>'+
      (item.tldr ? '<p class="publication-tldr" id="'+id+'"'+(expanded ? '' : ' hidden')+'>'+escape(item.tldr)+'</p>' : '')+'</article>';
  }
  function authors(item) {
    return item.authors.split(',').map(author => {
      const equal = author.trim().endsWith('*');
      const name = author.trim().replace(/\*$/, '');
      return (name === 'Xinkai Zou' ? '<strong>'+escape(name)+'</strong>' : escape(name))+
        (equal ? '<sup title="Equal contribution" aria-label="equal contribution">*</sup>' : '')+
        ((item.correspondingAuthors || []).includes(name) ? '<sup title="Corresponding author" aria-label="corresponding author">†</sup>' : '');
    }).join(', ');
  }
  function showView() {
    if (!document.querySelector('.view')) return;
    const route = location.hash.slice(1);
    if (route === 'main') return;
    const current = ['socialsim','modeling','language-models'].includes(route) ? 'research' : names[route] ? route : 'about';
    for (const view of document.querySelectorAll('.view')) view.hidden = view.id !== current;
    for (const anchor of document.querySelectorAll('header nav a')) {
      if (anchor.hash === '#'+current) anchor.setAttribute('aria-current','page');
      else anchor.removeAttribute('aria-current');
    }
    document.title = (site.data?.profile.name || 'Jay (Xinkai) Zou')+' · '+names[current];
    if (route === 'modeling' || route === 'language-models') document.getElementById('language-models')?.scrollIntoView();
    else window.scrollTo({top:0,behavior:'instant'});
  }
  function render() {
    const data = site.data, profile = data.profile;
    for (const mark of document.querySelectorAll('.wordmark')) mark.textContent = profile.name;
    const footer = document.querySelector('footer');
    footer.innerHTML = [['scholarUrl','Google Scholar'],['githubUrl','GitHub'],['linkedinUrl','LinkedIn'],['xUrl','X']]
      .filter(([key]) => profile[key]).map(([key,label]) => link(profile[key],label)).join('');
    if (document.querySelector('#about')) {
      document.querySelector('#about').innerHTML = '<div class="bio"><img class="portrait" src="'+escape(safeURL(data.about.portrait))+'" width="108" height="144" alt="Jay’s photo">'+data.about.paragraphs.map(p=>'<p>'+inline(p)+'</p>').join('')+'</div><p class="email">Email: '+link('mailto:'+profile.email,profile.email,false)+'</p>';
      document.querySelector('#publications').innerHTML = '<h1>Publications</h1><p class="author-legend"><span><sup>*</sup> Equal contribution</span><span><sup>†</sup> Corresponding authors</span></p><div id="publication-list">'+groups.map(group =>
        '<section class="research-group" aria-labelledby="research-'+group.id+'"><h2 id="research-'+group.id+'"><button type="button" class="group-toggle" data-group="'+group.id+'" aria-expanded="'+!collapsedGroups.has(group.id)+'" aria-controls="papers-'+group.id+'">'+group.title+' <span class="toggle-hint">[click to '+(collapsedGroups.has(group.id) ? 'show' : 'hide')+']</span></button></h2><div id="papers-'+group.id+'"'+(collapsedGroups.has(group.id) ? ' hidden' : '')+'>'+
        data.research.publications.map((item,index)=>item.topic===group.id ? publication(item,index) : '').join('')+'</div></section>'
      ).join('')+'</div>';
      document.querySelector('#research').innerHTML = '<header class="research-introduction"><h1>Research</h1></header>'+socialSimulation(data)+modeling(data);
      document.querySelector('#projects').innerHTML = '<h1>Projects</h1><ul class="project-list">'+data.projects.items.map(item =>
        '<li><div>'+link(item.url,item.name)+' <span class="secondary-links">'+['project','paper','code','post'].filter(key=>item[key]).map(key=>'['+link(item[key],key)+']').join(' ')+'</span>'+
        (item.starsRepo ? '<a class="stars" href="https://github.com/'+escape(item.starsRepo)+'/stargazers" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/'+escape(item.starsRepo)+'?style=social" alt="'+escape(item.name)+' GitHub stars" height="20" loading="lazy"></a>' : '')+
        '</div><p>'+escape(item.description)+'</p></li>').join('')+'</ul>';
      document.querySelector('#blogs').innerHTML = '<h1>Blogs</h1><ul class="blog-list">'+data.blogs.items.map(item =>
        '<li><time datetime="'+escape(item.date)+'">'+escape(item.date.slice(0,7).replace('-','.'))+'</time><div>'+link('/blogs/'+item.slug+'/',item.title,false)+(item.venue ? '<p class="blog-venue">'+escape(item.venue)+'</p>' : '')+'</div></li>').join('')+'</ul>';
      document.querySelector('#experience').innerHTML = '<h1>Experience</h1><section class="experience-section"><h2>Work Experience</h2><ul class="experience-list">'+data.experience.work.map(item=>
        '<li><span class="experience-date">'+escape(item.when)+'</span><div><strong>'+escape(item.where)+'</strong><p>'+escape(item.role)+'</p></div></li>').join('')+'</ul></section><section class="experience-section"><h2>Awards</h2><ul class="award-list">'+data.experience.awards.map(item=>
        '<li><span class="experience-date">'+escape(item.year)+'</span><span>'+escape(item.title)+'</span></li>').join('')+'</ul></section><section class="experience-section"><h2>Service</h2><ul class="service-list">'+data.experience.service.map(item=>'<li>'+escape(item.title)+'</li>').join('')+'</ul></section>';
      showView();
    } else {
      const article = document.querySelector('[data-blog-slug]');
      const item = data.blogs.items.find(item=>item.slug===article?.dataset.blogSlug);
      if (item) {
        document.querySelector('#article-title').textContent = item.title;
        const time = document.querySelector('.blog-heading time');
        time.dateTime = item.date;
        time.textContent = item.date.replaceAll('-','.');
        let venue = document.querySelector('.blog-heading .blog-venue');
        if (!venue) { venue = document.createElement('span'); venue.className = 'blog-venue'; time.after(venue); }
        venue.textContent = item.venue;
        venue.hidden = !item.venue;
        document.title = item.title+' · '+profile.name;
      }
    }
  }
  const site = {data:null};
  site.reload = async () => {
    const response = await fetch('/content.json',{cache:'no-store'});
    if (!response.ok) throw new Error('Unable to load page content.');
    site.data = await response.json();
    render();
  };
  window.addEventListener('hashchange',showView);
  document.addEventListener('site-content-preview', event => { site.data = event.detail; render(); });
  document.addEventListener('click',event=>{
    const toggle = event.target.closest('.group-toggle,.tldr-toggle');
    if (toggle) {
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded',String(expanded));
      document.getElementById(toggle.getAttribute('aria-controls')).hidden = !expanded;
      if (toggle.classList.contains('group-toggle')) {
        toggle.querySelector('.toggle-hint').textContent = '[click to '+(expanded ? 'hide' : 'show')+']';
        collapsedGroups[expanded ? 'delete' : 'add'](toggle.dataset.group);
      } else {
        expandedSummaries[expanded ? 'add' : 'delete'](toggle.dataset.paper);
      }
      return;
    }
    const anchor = event.target.closest('header a[href^="#"]');
    if (anchor && names[anchor.hash.slice(1)] && location.hash===anchor.hash) {
      event.preventDefault(); showView();
    }
  });
  site.reload().catch(error=>{
    const notice = document.createElement('p');
    notice.setAttribute('role','alert');
    notice.textContent = 'Unable to load content. Please refresh the page.';
    document.querySelector('main').prepend(notice);
    console.error(error);
  });
})();
