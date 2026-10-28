(() => {
  if (!document.querySelector('.view')) return;
  const clone = value => structuredClone(value);
  const names = {socialsim:'社会模拟',modeling:'Language Models',research:'论文列表',about:'个人介绍',profile:'个人信息',projects:'项目',blogs:'博客信息',experience:'经历'};
  const labels = {headline:'研究介绍',intro:'简介',heading:'章节标题',label:'显示名称 / 简称',description:'说明',question:'研究问题',category:'分类',paper:'论文链接',title:'完整名称',venue:'会议 / 发表状态',authors:'作者',year:'年份',topic:'分组',tldr:'一句话简介',code:'代码链接',dataset:'数据集',project:'项目链接',name:'名称',email:'邮箱',paragraphs:'介绍段落',evaluation:'Evaluation',branches:'研究分支',methods:'模型方法',papers:'论文',publications:'论文',items:'条目',url:'链接',date:'日期',when:'时间',where:'机构',role:'角色',portrait:'照片路径'};
  let original, draft, revision, token, changed = false, saving = false, timer;
  const launcher = document.createElement('button');
  launcher.className = 'local-edit-launcher'; launcher.textContent = '编辑内容'; launcher.type = 'button';
  const panel = document.createElement('aside'); panel.className = 'local-edit-panel'; panel.hidden = true;
  panel.setAttribute('aria-label','本地内容编辑器');
  panel.innerHTML = '<div class="local-edit-header"><div><strong>编辑网页内容</strong><p>保存到本地项目</p></div><button type="button" data-action="close" aria-label="收起编辑器">×</button></div><label class="local-edit-section-label">编辑部分<select aria-label="编辑部分"></select></label><p class="local-edit-help">修改后会立即预览。论文链接会同步到关联条目。</p><div class="local-edit-fields"></div><div class="local-edit-bottom"><p role="status" aria-live="polite">正在读取内容…</p><div><button type="button" data-action="undo" disabled>撤销修改</button><button type="button" data-action="save" disabled>保存到项目</button></div><button type="button" data-action="export" class="local-edit-export">下载草稿备份</button></div>';
  document.body.append(launcher,panel);
  const selector = panel.querySelector('select');
  for (const [key,label] of Object.entries(names)) {const option = document.createElement('option');option.value=key;option.textContent=label;selector.append(option);}
  const status = panel.querySelector('[role=status]');
  const save = panel.querySelector('[data-action=save]');
  const undo = panel.querySelector('[data-action=undo]');
  const fields = panel.querySelector('.local-edit-fields');
  const at = path => path.reduce((value,key)=>value[key],draft);
  function preview() {document.dispatchEvent(new CustomEvent('site-content-preview',{detail:clone(draft)}));}
  function state() {
    changed = JSON.stringify(draft) !== JSON.stringify(original);
    save.disabled = !changed || saving; undo.disabled = !changed || saving;
    launcher.textContent = changed ? '编辑内容 · 未保存' : '编辑内容';
  }
  function update(path,value) {
    const old = at(path); const parent = at(path.slice(0,-1)); parent[path.at(-1)] = value;
    // A changed publication URL remains connected to its research entries.
    if (path[0] === 'research' && path.at(-1) === 'paper' && old !== value) {
      const refs = [...draft.socialsim.evaluation,...draft.socialsim.branches.flatMap(b=>b.papers),...draft.modeling.methods,...draft.modeling.evaluation];
      for (const item of refs) if (item.paper === old) item.paper = value;
    }
    state();status.textContent = changed ? '未保存。预览已更新。' : '没有未保存的修改。';
    clearTimeout(timer);timer=setTimeout(preview,200);
  }
  function form(value,path,parent) {
    if (Array.isArray(value)) {
      value.forEach((item,index)=>{
        if (item && typeof item === 'object') {
          const detail=document.createElement('details'); detail.open=path.length<2;
          const summary=document.createElement('summary'); summary.textContent=item.label||item.title||item.name||item.where||`条目 ${index+1}`;
          detail.append(summary);parent.append(detail);form(item,[...path,index],detail);
        } else form(item,[...path,index],parent);
      }); return;
    }
    if (value && typeof value === 'object') {
      Object.entries(value).forEach(([key,item])=>{
        if (path[0] === 'socialsim' && ['intro','description','question'].includes(key)) return;
        if (path[0] === 'modeling' && ['headline','intro','description'].includes(key)) return;
        if (item && typeof item === 'object') {
          const group=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent=labels[key]||key;group.append(legend);parent.append(group);form(item,[...path,key],group);
        } else form(item,[...path,key],parent);
      }); return;
    }
    const field=document.createElement('label');field.className='local-edit-field';
    const label=document.createElement('span');const key=path.at(-1);label.textContent=labels[key]||(typeof key==='number'?`第 ${key+1} 项`:key);
    let input;
    if (key === 'paper' && ['socialsim','modeling'].includes(path[0])) {
      input=document.createElement('select');
      for (const paper of draft.research.publications) {const opt=document.createElement('option');opt.value=paper.paper;opt.textContent=paper.title;input.append(opt);}
    } else if (typeof value === 'string' && (value.length>85 || ['headline','description','intro','tldr'].includes(key) || path.includes('paragraphs'))) {
      input=document.createElement('textarea');input.rows=Math.min(5,Math.max(2,Math.ceil(value.length/60)));
    } else {input=document.createElement('input');input.type=typeof value==='number'?'number':'text';}
    input.value=value??'';input.dataset.path=path.join('.');input.addEventListener('input',()=>update(path,typeof value==='number'?Number(input.value):input.value));
    field.append(label,input);parent.append(field);
  }
  function renderForm() {fields.replaceChildren();form(draft[selector.value],[selector.value],fields);}
  function targetSection() {
    const route=location.hash.slice(1);
    return route==='publications'?'research':route==='modeling'||route==='language-models'?'modeling':route==='research'||route==='socialsim'?'socialsim':names[route]?route:'socialsim';
  }
  launcher.addEventListener('click',()=>{panel.hidden=false;launcher.hidden=true;selector.value=targetSection();if(draft)renderForm();});
  selector.addEventListener('change',()=>{
    const routes={socialsim:'research',modeling:'language-models',research:'publications',profile:'about'};
    location.hash=routes[selector.value]||selector.value;renderForm();
  });
  panel.addEventListener('click',async event=>{
    const action=event.target.closest('[data-action]')?.dataset.action;
    if (action==='close') {panel.hidden=true;launcher.hidden=false;}
    if (action==='undo') {clearTimeout(timer);draft=clone(original);renderForm();preview();state();status.textContent='已撤销未保存的修改。';}
    if (action==='export' && draft) {
      const url=URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)+'\n'],{type:'application/json'}));
      const a=document.createElement('a');a.href=url;a.download='content-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
    if (action==='save' && !saving && changed) {
      saving=true;state();status.textContent='正在保存…';fields.inert=true;selector.disabled=true;
      try {
        const response=await fetch('/__editor/save',{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':token},body:JSON.stringify({content:draft,revision})});
        const result=await response.json();if(!response.ok)throw new Error(result.error||'保存失败');
        original=clone(result.content);draft=clone(result.content);revision=result.revision;preview();status.textContent='已保存到 static/content.json。';
      } catch(error) {status.textContent=error.message;}
      finally {saving=false;fields.inert=false;selector.disabled=false;state();}
    }
  });
  window.addEventListener('beforeunload',event=>{if(changed){event.preventDefault();event.returnValue='';}});
  fetch('/__editor/state').then(r=>{if(!r.ok)throw new Error('无法读取项目内容');return r.json();}).then(result=>{
    original=clone(result.content);draft=clone(result.content);revision=result.revision;token=result.token;status.textContent='内容已读取。修改后点击保存。';selector.value=targetSection();renderForm();state();
  }).catch(error=>{status.textContent=error.message;});
})();
