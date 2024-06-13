<script>
	import { Button, Card, Header, Tooltip } from 'svelte-ux';
</script>

<Card title="Lançamentos">
	<Header title="Title" subheading="Subheading" slot="header">
		<div slot="actions">
			<Tooltip title="Nova despesa">
				<Button size="lg" icon="https://api.iconify.design/ph/plus-circle.svg" color="danger" />
			</Tooltip>
			<Tooltip title="Nova receita">
				<Button size="lg" icon="https://api.iconify.design/ph/plus-circle.svg" color="success" />
			</Tooltip>
		</div>
	</Header>
</Card>
