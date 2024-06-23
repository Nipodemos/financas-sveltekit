// import db from './src/lib/database/connection';
// import { Usuario } from './src/lib/database/types';
if (typeof process.env.SURREALDB_USERNAME === 'undefined') {
	throw new Error('DATABASE_USERNAME não definido');
}
if (typeof process.env.SURREALDB_PASSWORD === 'undefined') {
	throw new Error('DATABASE_PASSWORD não definido');
}

// const dadosLogin = {
// 	email: 'a.lazi@hotmail.com',
// 	senha: '123'
// };
// try {
// 	const retorno = await db.signin({
// 		namespace: process.env.SURREALDB_NAMESPACE,
// 		database: process.env.SURREALDB_DATABASE,
// 		scope: 'usuario',
// 		email: dadosLogin.email,
// 		senha: dadosLogin.senha
// 	});
// 	console.log('retorno :>> ', retorno);
// } catch (e) {
// 	if (e instanceof Error) {
// 		if (e.name === 'ResponseError') {
// 			return false;
// 		}
// 	}
// }

// await db.signin({
// username: process.env.SURREALDB_USERNAME,
// password: process.env.SURREALDB_PASSWORD
// });

// const [usuarioExistente] = await db.query<[Usuario[]]>(
// 	'SELECT * FROM usuario WHERE email = $email',
// 	{
// 		email: 'a.lanzi@hotmail.com'
// 	}
// );

// if (usuarioExistente.length > 0) {
// 	throw new Error('Usuário já cadastrado');
// }

// console.log('usuarioExistente :>> ', usuarioExistente);
process.exit(0);
