//JS da tela inicial do jogo

let botaoFecharEl = document.querySelector('#botao-fechar');
let modalEl = document.querySelector('#modall');
let girar = document.querySelectorAll('.abrirCreditos');
let info = document.querySelector('#inf');
let descricaoEl = document.querySelector('#descricao');
let tranmodal = document.querySelector('.modal-content');
let Micon = document.querySelector('#activated');
let active = document.querySelector('#disabled');
let iconeTelaCheia = document.querySelector('#fullscreen');
let iconeTelaMinimizada = document.querySelector('#minimizar');

//JS DOS CONTROLES (Modal,audio e Tela cheia)
function telaCheia(e){
    iconeTelaCheia.style.display = 'none';
    iconeTelaMinimizada.style.display = 'block';  
}
    
function telaMinimizada(e){
    iconeTelaCheia.style.display = 'block';
    iconeTelaMinimizada.style.display = 'none';
}

function alteraricon(e){
    Micon.style.display = 'none';
    active.style.display = 'block';  
}
    
function iconativado(e){
    Micon.style.display = 'block';
    active.style.display = 'none';
}

function CloseModal(e) {
  modalEl.style.display = 'none';
}
function OpenModal(e) {
	modal.open();
}

//JS da Tela cheia
  function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
} 

// JS do modal personalizado
let modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    closeLabel: "Fechar",
    cssClass: ['custom-class-1', 'custom-class-2']
});

modal.setContent('<div id="credits"><header><h2>Créditos:</h2></header><div id="modalBody"><h4>Arthur Nunes</h4><h4>Caio Bastos</h4><p></p><h4>Elissandro Caetano</h4><p></p><h4>Nicolas Lopes</h4><p></p><h4>João Vinicius</h4><p></p></div><header><h2>Colaboradores:</h2></header><div id="modalBody"><h4>Anolan Milanes</h4><h4>Marcos Prado</h4><h4>Flavio Coutinho</h4></div></div>');
// add a button
modal.addFooterBtn('Fechar', 'tingle-btn tingle-btn--pull-right tingle-btn--primary btz', function() {
    // here goes some logic
    modal.close();
});


info.addEventListener('click', OpenModal);
Micon.addEventListener('click',alteraricon);
active.addEventListener('click',iconativado);
iconeTelaCheia.addEventListener('click',telaCheia);
iconeTelaMinimizada.addEventListener('click',telaMinimizada);