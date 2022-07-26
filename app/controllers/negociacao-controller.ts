import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiaDaSemana } from "../enums/dias-da-semana.js";

export class NegocicaoController {
	private inputData: HTMLInputElement;
	private inputQuantidade: HTMLInputElement;
	private inputValor: HTMLInputElement;
	private negocicoes = new Negociacoes();
	private negociacoesView = new NegociacoesView('#negociacoesView');
	private mensagemView = new MensagemView('#mensagemView');

	constructor() {
		this.inputData = document.querySelector('#data');
		this.inputQuantidade = document.querySelector('#quantidade');
		this.inputValor = document.querySelector('#valor');
		this.negociacoesView.update(this.negocicoes);
	}
	public adicionar(): void {
		const negociacao = this.criaNegociacao();
		if (!this.ehDiaUtil(negociacao.data)){
			this.mensagemView.update('Apenas Negocições em dias úteis são aceitas');
			return;
		}

		this.negocicoes.adiciona(negociacao);
		this.limparFormulario();
		this.atualizaView();
	}

	private ehDiaUtil(data: Date) {
		return data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO;
	}
	private criaNegociacao(): Negociacao {
		const exp = /-/g;
		const date = new Date(this.inputData.value.replace(exp, '/'));
		const quantidade = parseInt(this.inputQuantidade.value);
		const valor = parseFloat(this.inputValor.value);
		return new Negociacao(date, quantidade, valor);
	}

	private limparFormulario(): void {
		this.inputData.value = '';
		this.inputQuantidade.value = '';
		this.inputValor.value = '';
		this.inputData.focus();
	}

	private atualizaView(): void {
		this.negociacoesView.update(this.negocicoes);
		this.mensagemView.update('Negociação adicionada com sucesso');
	}
}