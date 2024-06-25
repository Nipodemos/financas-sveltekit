import type { PageServerLoad } from './$types';
import db from '$lib/database/connection';
import type { Categoria } from '$lib/database/types';

export const load: PageServerLoad = async () => {
	const [categorias] = await db.query<[Categoria[]]>(
		'SELECT * FROM categoria WHERE cancelado_em IS NULL ORDER BY nome ASC'
	);

	const categoriasDeDespesa = categorias.filter(
		(categoria) => categoria.tipoCategoria === 'despesa'
	);
	const categoriasDeReceita = categorias.filter(
		(categoria) => categoria.tipoCategoria === 'receita'
	);

	return {
		categoriasDeDespesa,
		categoriasDeReceita
	};
};
