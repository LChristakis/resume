var LChristakisResume;
XHR('/LChristakisResume.json',function(data){
    LChristakisResume = JSON.parse(data);
    console.log(data);
});
