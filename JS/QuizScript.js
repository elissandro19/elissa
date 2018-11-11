// Variaveis globais
let questoes = [{
	pergunta: "[basico] Pedrinho tem 6 bolas a mais do que Chico. Os dois juntos têm 54. Quantas bolas tem Chico?",
	resultado: 24
}, {
	pergunta: "[basico] Num edifício há 12 salas e cada sala tem 2 janelas e 1 luz no teto. Ontem à noite Júlia contou 18 janelas iluminadas. Em quantas salas a luz estava apagada?",
	resultado: 3
},{
	pergunta: "[médio] Quantos números pares de 3 algarismo têm 2 algarismos ímpares?",
	resultado: 125
}, {
	pergunta: "[médio] Qual o algarismo das unidades do número 1 x 3 x 5 x ...x 97 x 99 ?",
	resultado: 5
},{
	pergunta: "[difícil] Henrique comprou barras de chocolate por R$1,35 cada uma. Ele pagoucom uma nota de R$10,00 e recebeu um troco inferior a R$1,00. Quantas barras elecomprou?",
	resultado: 7
}, {
	pergunta: "[difícil] Uma classe tem 22 alunos e 18 alunas. Durante as férias , 60 % de todos os alunos dessa classe foram prestar trabalho comunitário. No mínimo, quantas alunas participaram desse trabalho?",
	resultado: 2
},
{
	pergunta: "",
	resultado: 0
}];

let pontos = 0;
let jogando = false;
let i=0;
let n=2;
let a=0;
//Variaveis DOM

let resposta = document.querySelector("#name");

let pontos_atuais = document.querySelector('#pontuacao_atual');
let pergunta_atual = document.querySelector('#calculo_atual');
let iniciar_btt = document.querySelector('#ButRes');
let num_qts = document.querySelector('#num_questoes');

resposta.addEventListener('keyup', function(e){
	if(e.keyCode === 13 && resposta.value !== ''){
		validador(a);
		a++;
		pergunta(a);
		i++;
		
		num_qts.innerHTML = n + '/6'
		n++
		if(i==6) {
			finalizar();
		}
	}
});


function pergunta(a){
	
	pergunta_atual.innerHTML = questoes[a].pergunta;
	resposta.value = '';

}

function iniciar() {
	jogando = true;
	pergunta(a);
	iniciar_btt.style.display = 'none';
	num_qts.style.display = 'block';
	resposta.disabled = false;
}
iniciar_btt.addEventListener('click', iniciar);

function finalizar() {
	jogando = false;
	pergunta_atual.innerHTML = ':)';
	iniciar_btt.style.display = 'block';
	pontos_atuais.innerHTML = '0';
	alert('Parabens, sua pontuacao foi de: ' + pontos + ' pontos');
	num_qts.style.display = 'none';
	n=1;
	num_qts.innerHTML = n + '/6';
	resposta.disabled = true;
	i=0;
	n=2;
	a=0;
}

function validador() {
	if(resposta.value == questoes[a].resultado) {
		pontos += 10;
		pontos_atuais.innerHTML = pontos;
	}
}