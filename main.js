function e(id){ return document.getElementById(id); }

input=e('input');

websites=[
	'https://www.twitch.tv/directory/following',
	'https://www.facebook.com/?sk=h_chr',
	'https://play.google.com/music',
	'https://www.youtube.com',
	'https://www.netflix.com/browse',
	'https://old.reddit.com',
];

function reset(){
	e('input').value='';
	e('suggestion').innerHTML='...';
	for(i=0; i<websites.length; ++i){
		p=document.createElement('p');
		a=document.createElement('a');
		a.href=websites[i];
		a.innerHTML=websites[i];
		p.appendChild(a);
		e('websites').appendChild(p);
	}
}

function parse(url){
	return url.slice(url.indexOf('.')+1).split('/');
}

function suggest(){
	if(e('input').value=='') return e('suggestion').innerHTML;
	//prefix
	max_splits=0;
	parsed=[]
	for(i=0; i<websites.length; ++i){
		p=parse(websites[i]);
		parsed.push(p);
		max_splits=Math.max(p.length, max_splits);
	}
	for(j=0; j<max_splits; ++j){
		for(i=0; i<parsed.length; ++i){
			if(j>=parsed[i].length) continue;
			if(parsed[i][j].startsWith(e('input').value)) return websites[i];
		}
	}
	//anywhere
	for(i=0; i<websites.length; ++i){
		if(websites[i].includes(e('input').value)) return websites[i];
	}
	return e('suggestion').innerHTML;
}

input.addEventListener('keyup', function(event){
	if(event.keyCode==13) window.location.href=e('suggestion').innerHTML;
	if(event.keyCode==27) reset();
	e('suggestion').innerHTML=suggest();
}); 

input.focus();
reset();