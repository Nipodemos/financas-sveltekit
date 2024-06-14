import db from './connection';
import type { Categoria } from './types';

async function main() {
	// criando categorias padrão
	const categoriasDespesa = [
		{
			nome: 'Alimentação',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Educação',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Lazer',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Moradia',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Saúde',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Transporte',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Vestuário',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Impostos e taxas',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Assinaturas e serviços',
			tipoCategoria: 'despesa'
		},
		{
			nome: 'Emprestado',
			tipoCategoria: 'despesa'
		}
	];

	for (const categoria of categoriasDespesa) {
		const [arrayCategoriaEncontrada] = await db.query<Categoria[]>(
			`SELECT * FROM categoria where nome = '${categoria.nome}'`
		);
		if (arrayCategoriaEncontrada.length === 0) {
			const resultInsert = await db.insert('categoria', categoria);
			if (!resultInsert) {
				throw new Error('Erro ao inserir categoria: ' + categoria.nome);
			}
			console.log('Categoria inserida com sucesso: ' + categoria.nome);
		} else {
			console.log('Categoria já existe: ' + categoria.nome);
		}
	}
}

main().then(() => {
	console.log('Seed finalizado');
	process.exit(0);
});
