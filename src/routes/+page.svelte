<script lang="ts">
	import AddTransaction from './addTransaction.svelte';

	interface Despesa {
		id?: string;
		descricao: string;
		valor: number;
		vencimento: Date;
		recebido: boolean;
	}
	let despesas = [
		{
			id: Math.random().toString(36).slice(2),
			descricao: 'cemig',
			valor: 400,
			vencimento: new Date(2022, 11, 17),
			recebido: true
		}
	];

	let receitas = [
		{
			id: Math.random().toString(36).slice(2),
			descricao: 'salario',
			valor: 1200,
			vencimento: new Date(2022, 11, 17),
			recebido: false
		}
	];

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

	const removerDespesa = (id: string) => {
		despesas = despesas.filter((item) => item.id !== id);
	};
</script>

<AddTransaction />

<h1>Receitas:</h1>
<ul>
	{#each receitas as receita}
		<li>
			{receita.descricao} -
			{receita.valor} -
			{receita.vencimento.toLocaleDateString()} -
			{receita.recebido ? 'Recebido' : 'Pendente'}
		</li>
	{/each}
</ul>

<h1>Despesas</h1>
<ul>
	{#each despesas as despesa}
		<li>
			{despesa.descricao} -
			{despesa.valor} -
			{despesa.vencimento.toLocaleDateString()} -
			{despesa.recebido ? 'Pago' : 'Pendente'}
		</li>
	{/each}
</ul>
