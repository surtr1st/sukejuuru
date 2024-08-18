import { Elysia } from 'elysia';
import { useDrizzle, profile } from './config';

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000);

async function testConnection() {
    try {
        const db = useDrizzle();
        console.log('test');
        const profiles = await db.select().from(profile);
        console.log(profiles);
    } catch (e) {
        console.error(e);
    }
}

testConnection();
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
