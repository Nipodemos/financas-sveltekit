import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import Surreal from 'surrealdb.js';

const schema = z
	.object({
		nome: z.string(),
		email: z.string(),
		senha: z.string(),
		confirmarSenha: z.string()
	})
	.refine((dados) => dados.senha === dados.confirmarSenha, {
		message: 'As senhas não conferem',
		path: ['confirmarSenha']
	});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return message(form, { tipo: 'fail', mensagem: 'Erro ao cadastrar usuário' });
		}

		const values = {
			namespace: 'test',
			database: 'financas',
			scope: 'usuario',
			nome: form.data.nome,
			email: form.data.email,
			senha: form.data.senha
		};

		console.log('values :>> ', values);
		const db = new Surreal();
		await db.connect('http://127.0.0.1:8000/rpc');
		db.use({ namespace: 'test', database: 'financas' });
		// Do something with the form data
		const signupToken = await db.signup(values);

		cookies.set('signupToken', signupToken, {
			path: '/cadastrar_usuario',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 14 // 14 dias
		});

		// Display a success status message
		return message(form, { tipo: 'success', mensagem: 'Usuário cadastrado com sucesso' });
	}
};
