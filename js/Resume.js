/** @jsx h */

let LChristakisResumeJSON = {};
XHR('/LChristakisResume.json',function(data){
    LChristakisResumeJSON = JSON.parse(data);
    let vdom = (
        <div id="foo">
            <ul>{ mapSkills(LChristakisResumeJSON.skillsets) }</ul>
        </div>
    );

    document.body.appendChild(render(vdom));
});

function mapSkills(skillsets) {
	return skillsets.map( function(skillset){ 
		var title = skillset.title;
		var skills = skillset.skills.join(',');
		return <li><b>{title}:</b>{skills} </li>;
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

/** hyperscript generator, gets called by transpiled JSX */
function h(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children };
}
