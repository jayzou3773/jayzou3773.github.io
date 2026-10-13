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
  const names = {about:'About',research:'Research',projects:'Projects',blogs:'Blogs',experience:'Experience'};
  const groups = [{id:'efficient',title:'Efficient AI'},{id:'discovery',title:'AI for Simulation'},{id:'hci',title:'Early days: HCI (penetrative AI)'}];
  const collapsedGroups = new Set(groups.map(group => group.id));
  const expandedSummaries = new Set();
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
    const current = names[route] ? route : 'about';
    for (const view of document.querySelectorAll('.view')) view.hidden = view.id !== current;
    for (const anchor of document.querySelectorAll('header nav a')) {
      if (anchor.hash === '#'+current) anchor.setAttribute('aria-current','page');
      else anchor.removeAttribute('aria-current');
    }
    document.title = (site.data?.profile.name || 'Jay (Xinkai) Zou')+' · '+names[current];
    window.scrollTo({top:0,behavior:'instant'});
  }
  function render() {
    const data = site.data, profile = data.profile;
    for (const mark of document.querySelectorAll('.wordmark')) mark.textContent = profile.name;
    const footer = document.querySelector('footer');
    footer.innerHTML = [['scholarUrl','Google Scholar'],['githubUrl','GitHub'],['linkedinUrl','LinkedIn'],['xUrl','X']]
      .filter(([key]) => profile[key]).map(([key,label]) => link(profile[key],label)).join('');
    if (document.querySelector('#about')) {
      document.querySelector('#about').innerHTML = '<div class="bio"><img class="portrait" src="'+escape(safeURL(data.about.portrait))+'" width="108" height="144" alt="Jay’s photo">'+data.about.paragraphs.map(p=>'<p>'+inline(p)+'</p>').join('')+'</div><p class="email">Email: '+link('mailto:'+profile.email,profile.email,false)+'</p>';
      document.querySelector('#research').innerHTML = '<h1>Research</h1><p class="author-legend"><span><sup>*</sup> Equal contribution</span><span><sup>†</sup> Corresponding authors</span></p><div id="publication-list">'+groups.map(group =>
        '<section class="research-group" aria-labelledby="research-'+group.id+'"><h2 id="research-'+group.id+'"><button type="button" class="group-toggle" data-group="'+group.id+'" aria-expanded="'+!collapsedGroups.has(group.id)+'" aria-controls="papers-'+group.id+'">'+group.title+' <span class="toggle-hint">[click to '+(collapsedGroups.has(group.id) ? 'show' : 'hide')+']</span></button></h2><div id="papers-'+group.id+'"'+(collapsedGroups.has(group.id) ? ' hidden' : '')+'>'+
        data.research.publications.map((item,index)=>item.topic===group.id ? publication(item,index) : '').join('')+'</div></section>'
      ).join('')+'</div>';
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
