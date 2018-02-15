let LChristakisResumeJSON = {};
XHR('/LChristakisResume.json',function(data){
    LChristakisResumeJSON = JSON.parse(data);
    let vdom = buildResume(LChristakisResumeJSON);
    
    document.body.appendChild(render(vdom));

});

function buildResume(resumeData){
    return (
        node('div',{class: 'container'},[
            node('h1',{class: 'container'},['LUKE CHRISTAKIS']),
            node('span',{},['561-302-4184 | LChristakis@gmail.com | LukeChristakis.com | github.com/LChristakis']),
            buildSection('SKILLS','qualifications',buildSkillBody.bind(null,resumeData.skillsets))
        ])
    );
}

function buildSection(sectionTitle,sectionClass,sectionBodyCallback){
    return (
        node('div',{class: sectionClass},[
            node('div',{class: 'section-header'},[
                node('h2',{},[sectionTitle])
            ]),
            node('div',{class: 'section-body'},[
                sectionBodyCallback()
            ])
	])
    )
}

function buildSkillBody(skillsets) {
    return (
        node('ul',{},
            skillsets.map( function(skillset){ 
		var title = skillset.title;
		var skills = skillset.skills.join(',');
		return node('li',{},[
                    node('b',{},[title]),
                    ' : ', skills
                ]);
	    })
        )
    );
}

// Render Virtual DOM to the real DOM
function render(vnode) {
    if (typeof vnode==='string') return document.createTextNode(vnode);
    let n = document.createElement(vnode.nodeName);
    Object.keys(vnode.attributes || {}).map( k => n.setAttribute(k, vnode.attributes[k]) );
    (vnode.children || []).forEach( c => n.appendChild(render(c)) );
    return n;
}

// Helper function so we don't have to write out nodeName, etc every time
function node(nodeName, attributes, children){
    return { 
        nodeName: nodeName,
        attributes: attributes,
        children: children
    }
}
