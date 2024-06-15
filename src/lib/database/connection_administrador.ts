import { Surreal } from 'surrealdb.js';

const db = new Surreal();

try {
	const connectionUrl = 'http://127.0.0.1:8000/rpc';
	await db.connect(connectionUrl, {
		namespace: 'test',
		database: 'financas',
		auth: {
			username: 'root',
			password: 'root'
		}
	});
} catch (e) {
	console.error(e);
}

export default db;
