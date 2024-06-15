<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form } = superForm(data.form);
</script>

<h1>Cadastrar Usuário</h1>
<form method="post">
	<label>
		Nome:<br />
		<input type="text" bind:value={$form.nome} name="nome" placeholder="Nome" required />
	</label>

	<label>
		Email:<br />
		<input type="email" bind:value={$form.email} name="email" placeholder="Email" required />
	</label>

	<label>
		Senha:<br />
		<input type="password" bind:value={$form.senha} name="senha" placeholder="Senha" required />
	</label>

	<label>
		Confirmar Senha:<br />
		<input
			type="password"
			bind:value={$form.confirmarSenha}
			name="confirmarSenha"
			placeholder="Confirmar Senha"
			required
		/>
	</label>

	<button type="submit">Cadastrar</button>
</form>
