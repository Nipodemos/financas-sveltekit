<script lang="ts">
	interface Despesa {
		id?: string;
		descricao: string;
		valor: number;
		vencimento: Date;
		recebido: boolean;
	}
	export let despesas: Despesa[] = [];
	export let despesaParaAlterar = '';

	let inputDescricao = '';
	let inputValor = 0;
	let inputVencimento = new Date();
	let inputRecebido = false;

	const addDespesa = ({ descricao, valor, vencimento, recebido }: Despesa) => {
		despesas = [
			...despesas,
			{
				id: Math.random().toString(36).slice(2),
				descricao,
				valor,
				vencimento,
				recebido
			}
		];
	};
	$: if (despesaParaAlterar !== '') {
		const despesa = despesas.find((item) => item.id === despesaParaAlterar);
		if (despesa) {
			inputDescricao = despesa.descricao;
			inputValor = despesa.valor;
			inputVencimento = despesa.vencimento;
			inputRecebido = despesa.recebido;
		}
	}
</script>

<form style="display: flex; flex-direction: column">
	Tipo:
	<div style="display: flex">
		<label>
			Despesa
			<input type="radio" name="tipo" value="despesa" />
		</label>
		<label>
			Receita
			<input type="radio" name="tipo" value="receita" />
		</label>
	</div>
	<label>
		Descrição:<br />
		<input type="text" name="descricao" />
	</label>
	<label>
		Valor:<br />
		<input type="number" name="valor" />
	</label>
	<label>
		Vencimento:<br />
		<input type="datetime-local" name="vencimento" />
	</label>
	<label>
		Recebido:<br />
		<div class="switch">
			<input type="checkbox" name="recebido" />
			<span class="slider round" />
		</div>
	</label>
</form>

<style>
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
