let mutarEl = document.querySelector('#activated');
let desmutarEl = document.querySelector('#disabled');
let musicaDeFundoEl = document.querySelector('#music');
document.body.addEventListener('mousemove', desmutar)

// musicaDeFundoEl.load();
// musicaDeFundoEl.play();

mutarEl.addEventListener('click', mutar);
desmutarEl.addEventListener('click', desmutar);

function mutar(e){
  musicaDeFundoEl.pause();
}

function desmutar(e){
  musicaDeFundoEl.play();

  document.body.removeEventListener('mousemove', desmutar);
}
