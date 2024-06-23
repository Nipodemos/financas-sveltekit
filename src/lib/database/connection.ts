import type { Cookies } from '@sveltejs/kit';
import { Surreal } from 'surrealdb.js';
import type { Usuario } from './types';

if (typeof process.env.SURREALDB_URL === 'undefined') {
	throw new Error('SURREALDB_URL não definido');
}
if (typeof process.env.SURREALDB_NAMESPACE === 'undefined') {
	throw new Error('SURREALDB_NAMESPACE não definido');
}
if (typeof process.env.SURREALDB_DATABASE === 'undefined') {
	throw new Error('SURREALDB_DATABASE não definido');
}

const db = new Surreal();

try {
	const connectionUrl = process.env.SURREALDB_URL;
	await db.connect(connectionUrl, {
		namespace: process.env.SURREALDB_NAMESPACE,
		database: process.env.SURREALDB_DATABASE
	});
} catch (e) {
	console.error(e);
}

export async function cadastrarUsuario(nome: string, email: string, senha: string) {
	if (typeof process.env.SURREALDB_USERNAME === 'undefined') {
		throw new Error('DATABASE_USERNAME não definido');
	}
	if (typeof process.env.SURREALDB_PASSWORD === 'undefined') {
		throw new Error('DATABASE_PASSWORD não definido');
	}
	if (typeof process.env.SURREALDB_URL === 'undefined') {
		throw new Error('SURREALDB_URL não definido');
	}
	if (typeof process.env.SURREALDB_NAMESPACE === 'undefined') {
		throw new Error('SURREALDB_NAMESPACE não definido');
	}
	if (typeof process.env.SURREALDB_DATABASE === 'undefined') {
		throw new Error('SURREALDB_DATABASE não definido');
	}
	await db.signin({
		username: process.env.SURREALDB_USERNAME,
		password: process.env.SURREALDB_PASSWORD
	});

	const usuarioExistente = await db.query<[Usuario[]]>(
		'SELECT * FROM usuario WHERE email = $email',
		{
			email
		}
	);

	if (usuarioExistente.length > 0) {
		return 'existente';
	}

	const signupToken = await db.signup({
		namespace: process.env.SURREALDB_NAMESPACE,
		database: process.env.SURREALDB_DATABASE,
		scope: 'usuario',
		nome: nome,
		email: email,
		senha: senha
	});

	return signupToken;
}

export async function logarUsuario(email: string, senha: string) {
	if (typeof process.env.SURREALDB_USERNAME === 'undefined') {
		throw new Error('DATABASE_USERNAME não definido');
	}
	if (typeof process.env.SURREALDB_PASSWORD === 'undefined') {
		throw new Error('DATABASE_PASSWORD não definido');
	}
	if (typeof process.env.SURREALDB_URL === 'undefined') {
		throw new Error('SURREALDB_URL não definido');
	}
	if (typeof process.env.SURREALDB_NAMESPACE === 'undefined') {
		throw new Error('SURREALDB_NAMESPACE não definido');
	}
	if (typeof process.env.SURREALDB_DATABASE === 'undefined') {
		throw new Error('SURREALDB_DATABASE não definido');
	}
	console.log('oi');

	try {
		const token = await db.signin({
			namespace: process.env.SURREALDB_NAMESPACE,
			database: process.env.SURREALDB_DATABASE,
			scope: 'usuario',
			email: email,
			senha: senha
		});
		return token;
	} catch (e) {
		if (e instanceof Error) {
			if (e.name === 'ResponseError') {
				return 'credenciais';
			}
		}
	}

	return 'desconhecido';
}

export async function checarAutenticado(cookies: Cookies) {
	const token = cookies.get('signupToken');
	if (!token) {
		return false;
	}

	return await db.authenticate(token);
}

export default db;
