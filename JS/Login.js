let Dados = {
	username: "Admin",
	password: "admin"
};

let nome_user = document.querySelector('#nome');
let senha_user = document.querySelector('#senha');
let botao = document.querySelector('#btt');
let sucesso = document.querySelector('#check_mark');
let signin = document.querySelector('#signin');
let pin = document.querySelector('#pin');
let voltar = document.querySelector('#voltar');
let corpo = document.querySelector('#bd');

function Logar(e) {
	if(nome_user.value == Dados.username && senha_user.value == Dados.password) {
		window.location.assign("index.html");
    }
	else {
		alert('Nome de usuario ou senha incorreta');
	}
}

botao.addEventListener('click', Logar);

senha_user.addEventListener('keyup', function(e) {
	if(e.keyCode === 13){
		if(nome_user.value == Dados.username && senha_user.value == Dados.password) {
		window.location.assign("index.html");
	}
	else {
		alert('Nome de usuario ou senha incorreta');
	}
}
});