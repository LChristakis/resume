let LChristakisResumeJSON = {};

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        LChristakisResumeJSON = JSON.parse(xhr.responseText);
        let vdom = buildResume(LChristakisResumeJSON);
        document.body.appendChild(render(vdom));
    }
}
xhr.open('GET','LChristakisResume.json',true);
xhr.send();

function buildResume(resumeData){
    return (
        node('div',{class: 'container'},[
            node('h1',{},['LUKE CHRISTAKIS']),
            node('span',{},['561-302-4184 | LChristakis@gmail.com | LukeChristakis.com | github.com/LChristakis']),
            buildSection('SKILLS','qualifications',buildSkillBody.bind(null,resumeData.skillsets)),
            buildSection('EMPLOYMENT HISTORY','employment',buildEmploymentBody.bind(null,resumeData.employment)),
            buildSection('EDUCATION','education',buildEducationBody.bind(null,resumeData.education))
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
                    ' : '+skills
                ]);
        })
        )
    );
}

function buildEmploymentBody(positions){
    return (
        node('div',{class: 'positions'},
            positions.map( function(position){
                position.end_year = position.end_year === null ? 'Present' : position.end_year;
                return(
                    node('div',{class: 'position'},[
                        node('div',{class: 'employment-header'},[
                            node('div',{class: 'employment-title'},[position.title+', '+position.company]),
                            node('div',{class: 'employment-date'},[position.start_year+'-'+position.end_year])
                        ]),
                        node('div',{class: 'employment-body'},[
                            buildPositionAccomplishments(position.accomplishments)
                        ])
                    ])
                )
            })
        )
    );
}

function buildPositionAccomplishments(accomplishments){
    return (
        node('ul',{},
            accomplishments.map( function(accomplishment){
                return node('li',{},[accomplishment])
            })
        )
    );
}

function buildEducationBody(degrees){
    return (
        node('ul',{},
            degrees.map(function(degree){
                return (
                    node('li',{},[
                        node('b',{},[degree.school,' '+degree.degree+', '+degree.field+', '+degree.GPA])
                    ])
                )
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
