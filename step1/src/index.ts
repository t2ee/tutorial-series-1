import 'reflect-metadata';
import * as path from 'path';
import * as Koa from 'koa';
import {
    ConfigurationStore,
} from '@t2ee/core';
ConfigurationStore.loadFile(path.resolve(__dirname, '../logger'));
import {
    Router,
} from '@t2ee/vader';
import Controller from './controller';


const router = Router.newInstance();
router.use(Controller);

const app = new Koa();
app.use(router.routes());
app.listen(8080);