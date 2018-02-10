let LChristakisResumeJSON = {};
XHR('/LChristakisResume.json',function(data){
    LChristakisResumeJSON = JSON.parse(data);
    let vdom = (
	{ nodeName:'div', attributes:{'id':'foo'},children:[
	    {nodeName:'ul',attributes:{},children:mapSkills(LChristakisResumeJSON.skillsets)}
	]}
    );
    
    document.body.appendChild(render(vdom));

});

function mapSkills(skillsets) {
	return skillsets.map( function(skillset){ 
		var title = skillset.title;
		var skills = skillset.skills.join(',');
		return { nodeName:'li', attributes:{}, children:[
		    {nodeName:'b', attributes:{}, children:[title]},
		    skills
		]};
	});
}

/** Render Virtual DOM to the real DOM */
function render(vnode) {
    if (typeof vnode==='string') return document.createTextNode(vnode);
    let n = document.createElement(vnode.nodeName);
    Object.keys(vnode.attributes || {}).forEach( k => n.setAttribute(k, vnode.attributes[k]) );
    (vnode.children || []).forEach( c => n.appendChild(render(c)) );
    return n;
}

