<script lang="ts">
	import AlterOrAddTransaction from './alterOraddTransaction.svelte';
	import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'sveltestrap';

	interface Despesa {
		id?: string;
		descricao: string;
		valor: number;
		vencimento: Date;
		recebido: boolean;
	}
	let open = false;
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

	const removerDespesa = (id: string) => {
		despesas = despesas.filter((item) => item.id !== id);
	};
	let despesaParaAlterar = '';
	const toggleModal = () => (open = !open);
	const alterarDespesa = (id: string) => {
		despesaParaAlterar = id;
		toggleModal();
	};
</script>

<h1>Receitas:</h1>
<ul id="listaReceitas">
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
<ul id="listaDespesas">
	{#each despesas as despesa}
		<li>
			{despesa.descricao} -
			{despesa.valor} -
			{despesa.vencimento.toLocaleDateString()} -
			{despesa.recebido ? 'Pago' : 'Pendente'}
			<button on:click={() => removerDespesa(despesa.id)}>Remover</button>
			<button on:click={() => alterarDespesa(despesa.id)}>Alterar</button>
		</li>
	{/each}
</ul>

<div>
	<Modal isOpen={open} toggle={toggleModal}>
		<ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
		<ModalBody>
			<AlterOrAddTransaction {despesaParaAlterar} {despesas} />
		</ModalBody>
		<ModalFooter>
			<Button color="primary" on:click={toggleModal}>Do Something</Button>
			<Button color="secondary" on:click={toggleModal}>Cancel</Button>
		</ModalFooter>
	</Modal>
</div>
