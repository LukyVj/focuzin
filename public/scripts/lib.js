function draw(url,y,x,w,h,c) {
  var color = '#'+c || '#FF0000';
  var canvas = document.getElementById('canvas');  
  var img = new Image();   // Crée un nouvel objet Image
  img.src = url; // Définit le chemin vers sa source
  img.onload = function(e){
    canvas.style.width = img.naturalWidth + 'px';
    canvas.style.height = img.naturalHeight + 'px';
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width,    img.height,  0, 0, canvas.width, canvas.height);
      ctx.strokeStyle=color;                 
      ctx.strokeRect(y,x,w,h);
    }
  }
}
var drawer = document.getElementById('drawer');
var iUrl   = document.getElementById('i_url');
var iy     = document.getElementById('i_y');
var ix     = document.getElementById('i_x');
var iw     = document.getElementById('i_w');
var ih     = document.getElementById('i_h');
var ic     = document.getElementById('i_c');
var sender = document.getElementById('send');
var userUrl = document.getElementById('result');

sender.addEventListener('click', function(){
  var va, vb, vc, vd, ve, vf;
  va = iUrl.value,
  vb = iy.value || 100,
  vc = ix.value || 100,
  vd = iw.value || 100,
  ve = ih.value || 100,
  vf = ic.value || 'FF0000';

 var finalUrl = location.protocol + '//' + location.host + '?u='+ va +'&y=' + vb + '&x=' + vc + '&w=' + vd + '&h=' + ve + '&c=' + vf;
  draw(va, vb, vc, vd, ve, vf);
  userUrl.innerHTML = '<a href="' + finalUrl + '" target="_blank">' + finalUrl + '</a>';
})

