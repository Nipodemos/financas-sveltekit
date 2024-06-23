import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { logarUsuario } from '$lib/database/connection';

const schema = z.object({
	email: z.string(),
	senha: z.string()
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
			return message(form, { tipo: 'fail', mensagem: 'Erro ao tentar fazer login' });
		}

		const retorno = await logarUsuario(form.data.email, form.data.senha);

		cookies.set('userToken', retorno, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 14 // 14 dias
		});

		// Display a success status message
		return message(form, { tipo: 'success', mensagem: 'Usuário cadastrado com sucesso' });
	}
};
