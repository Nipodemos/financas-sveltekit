<script lang="ts">
	import { Card } from 'svelte-ux';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form, enhance } = superForm(data.form);
</script>

<Card title="Cadastrar Usuário">
	<div slot="contents">
		<form use:enhance method="post">
			<label>
				Nome:
				<input type="text" bind:value={$form.nome} name="nome" placeholder="Nome" required />
			</label>

			<label>
				Email:
				<input type="email" bind:value={$form.email} name="email" placeholder="Email" required />
			</label>

			<label>
				Senha:
				<input type="password" bind:value={$form.senha} name="senha" placeholder="Senha" required />
			</label>

			<label>
				Confirmar Senha:
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
	</div>
</Card>
