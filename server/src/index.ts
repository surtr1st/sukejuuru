import { Arcane, createRouter, ok } from '@bunarcane/arcane';

const config = {
    port: 7000,
    context: 'Starting application on localhost:7000',
};

const HelloWorld = createRouter()
    .get('/', () => ok('Hello World'))
    .compose();

new Arcane().use(HelloWorld).serve(config);
