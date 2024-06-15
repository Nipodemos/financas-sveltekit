<script lang="ts">
	import {
		Button,
		Card,
		Dialog,
		Field,
		Header,
		SelectField,
		TextField,
		Toggle,
		Tooltip,
		Icon
	} from 'svelte-ux';

	let modalDespesaIsLoading = false;
	export let data;
	const categoriasDeReceita = data.categoriasDeReceita;
	const categoriasDeDespesa = data.categoriasDeDespesa;
</script>

<Card title="Lançamentos">
	<Header title="Title" subheading="Subheading" slot="header">
		<div slot="actions">
			<Toggle on let:on={open} let:toggle>
				<Tooltip title="Nova despesa">
					<Button
						on:click={toggle}
						size="lg"
						icon="https://api.iconify.design/ph/plus-circle.svg"
						color="danger"
					/>
				</Tooltip>
				<Dialog {open} loading={modalDespesaIsLoading} on:close={toggle} persistent>
					<div slot="title">Criar nova despesa</div>
					<div class="p-2">
						<form class="grid grid-cols-2 gap-2">
							<TextField autofocus label="Descrição" labelPlacement="top" class="col-span-2">
								<div slot="prefix">abc</div>
							</TextField>
							<TextField label="Valor" labelPlacement="top">
								<div slot="prefix">R$</div>
							</TextField>
							<Field labelPlacement="top" label="Data" let:id>
								<input
									{id}
									type="datetime-local"
									class="text-sm w-full outline-none bg-surface-100"
								/>
							</Field>

							<Field label="Cartão" labelPlacement="top">
								<select
									class="text-sm w-full outline-none appearance-none cursor-pointer bg-surface-100"
								>
									<option value={1}>First</option>
									<option value={2}>Second</option>
									<option value={3}>Third</option>
									<option value={4}>Fourth</option>
								</select>
								<span slot="append">
									<Icon data="https://api.iconify.design/ph/arrow-down.svg" />
								</span>
							</Field>

							<Field label="Categoria" labelPlacement="top">
								<select
									class="text-sm w-full outline-none appearance-none cursor-pointer bg-surface-100"
								>
									{#each categoriasDeDespesa as categoria}
										<option value={categoria.id}>{categoria.nome}</option>
									{/each}
								</select>
								<span slot="append">
									<Icon data="https://api.iconify.design/ph/arrow-down.svg" />
								</span>
							</Field>
						</form>
					</div>
					<div slot="actions">
						<Button>Close</Button>
						<Button type="submit" variant="fill" color="primary">Salvar</Button>
					</div>
				</Dialog>
			</Toggle>

			<Toggle let:on={open} let:toggle>
				<Tooltip title="Nova receita">
					<Button
						on:click={toggle}
						size="lg"
						icon="https://api.iconify.design/ph/plus-circle.svg"
						color="success"
					/>
				</Tooltip>
				<Dialog {open} on:close={toggle} persistent>
					<div slot="title">Are you sure you want to do that?</div>
					<div slot="actions">
						<Button variant="fill" color="primary">Close</Button>
					</div>
				</Dialog>
			</Toggle>
		</div>
	</Header>
	<div slot="contents">
		<p>Lista de conteúdo vai ficar aqui</p>
	</div>
</Card>
