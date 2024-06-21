<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Card, Field, TextField } from 'svelte-ux';
	import { type Infer, superForm } from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form, enhance, errors, constraints, message } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.tipo == 'success') {
					goto('/login');
				}
			}
		}
	});
</script>

<Card>
	<div class="container" slot="contents">
		<div class="row">
			<div class="md:col-4"></div>
			<div class="md:col-4">
				<Card class="bg-surface-300 mt-4 shadow-2xl" title="Cadastrar Usuário">
					<div slot="contents">
						<form class="flex flex-col gap-2" use:enhance method="post">
							<Field hint={$errors.nome?.join('<br>')} error={!!$errors.nome} label="Nome" let:id>
								<input
									{id}
									type="text"
									name="nome"
									bind:value={$form.nome}
									class="w-full outline-none bg-surface-100"
									{...$constraints.nome}
								/>
							</Field>

							<Field
								hint={$errors.email?.join('<br>')}
								error={!!$errors.email}
								label="Email"
								let:id
							>
								<input
									{id}
									type="email"
									name="email"
									bind:value={$form.email}
									class="w-full outline-none bg-surface-100"
									{...$constraints.email}
								/>
							</Field>

							<Field
								hint={$errors.senha?.join('<br>')}
								error={!!$errors.senha}
								label="Senha"
								let:id
							>
								<input
									{id}
									type="password"
									name="senha"
									bind:value={$form.senha}
									class="w-full outline-none bg-surface-100"
									{...$constraints.senha}
								/>
							</Field>

							<Field
								hint={$errors.confirmarSenha?.join('<br>')}
								error={!!$errors.confirmarSenha}
								label="Confirmar Senha"
								let:id
							>
								<input
									{id}
									type="password"
									name="confirmarSenha"
									bind:value={$form.confirmarSenha}
									class="w-full outline-none bg-surface-100"
									{...$constraints.confirmarSenha}
								/>
							</Field>

							<Button class="my-2" variant="fill" color="primary" type="submit">Cadastrar</Button>
						</form>
						<div>
							{#if $message}
								<div class="text-center text-sm text-primary-500">
									{$message}
								</div>
							{/if}
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</Card>
