<script lang="ts">
	import { Table } from 'svelte-ux';
</script>

<h2>Cartões de débito</h2>
<Table
	{data}
	columns={[
		{
			name: 'name',
			align: 'left'
		},
		{
			name: 'calories',
			align: 'right',
			format: 'integer'
		}
	]}
/>

<h2>Cartões de crédito</h2>
