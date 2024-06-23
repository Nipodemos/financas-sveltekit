import type { RecordId } from 'surrealdb.js';

export interface BaseTabela {
	id: RecordId | string;
	criadoEm: Date;
	atualizadoEm: Date;
	canceladoEm: Date | null;
}

export interface Categoria extends BaseTabela {
	nome: string;
	icone?: string;
	tipoCategoria: 'despesa' | 'receita';
}

export interface Usuario extends BaseTabela {
	nome: string;
	email: string;
	senha: string;
}
// export interface Estado extends BaseTabela {
// 	nome: string;
// 	sigla: string;
// 	listaCidades: Cidade[] | string[];
// }

// export interface Cidade extends BaseTabela {
// 	nome: string;
// 	estado: Estado | string;
// 	codigoIbge: string;
// }

// export interface Tela extends BaseTabela {
// 	menu: string;
// 	submenu: string;
// 	codigo: string;
// 	icone: string;
// 	url: string;
// }
