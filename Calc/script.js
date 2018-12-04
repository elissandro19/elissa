//Mostra o numero na calculadora
function inserir_num(num) {
	document.form.textview.value = document.form.textview.value + num;
}
//Calcula a conta
function resposta() {
	let txt = document.form.textview.value;
	if(txt) {
		document.form.textview.value = eval(txt);
	}
}
//Limpa a tela
function limpar() {
	document.form.textview.value = '';
}
//Apagador
function voltar() {
	let txt = document.form.textview.value;
	document.form.textview.value = txt.substring(0,txt.length-1);
}