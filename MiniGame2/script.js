// Variaveis globais
let questoes = [{
        pergunta: "[BASICO] Pedrinho tem 6 bolas a mais do que Chico. Os dois juntos têm 54. Quantas bolas tem Chico?",
        resultado: 24
}, {
        pergunta: "[BASICO] Num edifício há 12 salas e cada sala tem 2 janelas e 1 luz no teto. Ontem à noite Júlia contou 18 janelas iluminadas. Em quantas salas a luz estava apagada?",
        resultado: 3
}, {
        pergunta: "[MEDIO] Quantos números pares de 3 algarismos têm 2 algarismos ímpares?",
        resultado: 125
}, {
        pergunta: "[MEDIO] Qual o algarismo das unidades do número 1 x 3 x 5 x ...x 97 x 99 ?",
        resultado: 5
}, {
        pergunta: "[DIFICIL] Henrique comprou barras de chocolate por R$1,35 cada uma. Ele pagou com uma nota de R$10,00 e recebeu um troco inferior a R$1,00. Quantas barras ele comprou?",
        resultado: 7
}, {
        pergunta: "[DIFICIL] Uma classe tem 22 alunos e 18 alunas. Durante as férias , 60 % de todos os alunos dessa classe foram prestar trabalho comunitário. No mínimo, quantas alunas participaram desse trabalho?",
        resultado: 2
}, {
        pergunta: "",
        resultado: 0
}];

let pontos = 0;
let jogando = false;
let i = 0;
let n = 2;
let a = 0;
//Variaveis DOM

let resposta = document.querySelector("#name");

let pontos_atuais = document.querySelector('#pontuacao_atual');
let pergunta_atual = document.querySelector('#calculo_atual');
let iniciar_btt = document.querySelector('#ButRes');
let num_qts = document.querySelector('#num_questoes');

resposta.addEventListener('keyup', function (e) {
    if (e.keyCode === 13 && resposta.value !== '') {
        validador();
        a++;
        pergunta(a);
        i++;
        num_qts.innerHTML = n + '/6'
        n++
        if (i == 6) {
            finalizar();
        }
    }
});


function pergunta(a) {
    pergunta_atual.innerHTML = questoes[a].pergunta;
    resposta.value = '';
}

function finalizar() {
    jogando = false;
    pontos_atuais.innerHTML = '0';
    modal.open();
    num_qts.style.display = 'none';
    n = 1;
    num_qts.innerHTML = n + '/6';
    resposta.disabled = true;
    i = 0;
    n = 2;
    a = 0;
}

function validador() {
    if (resposta.value == questoes[a].resultado) {
        if(i==6) {
            finalizar();
        }
        pontos += 10;
        pontos_atuais.innerHTML = pontos;
        modal.setContent('<h3>Sua pontuacao foi de ' + pontos + ', mas se quiser melhorar, pode tentar novamente ou passar para a ultima fase... Você está preparado para enfrentar um quiz?? Boa Sorte :)</h3>');
    }
}

let modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2']
});


modal.addFooterBtn('Próxima Fase >', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function () {
    window.open('../MiniGame3/index.html');
});

modal.addFooterBtn('Tentar Novamente', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function () {
    modal.close();
});
