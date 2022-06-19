import cluster from 'cluster'
import { cpus } from 'os'
import { pid } from 'process'
import http from 'http';
import dotenv from 'dotenv';

import routing from './routing';

const env = dotenv.config();
const port = (env.parsed && env.parsed.PORT) || 4000;

const createScalableServer = () => {
    if (cluster.isPrimary) {
        const cpu = cpus();
        const numOfCpus = cpus.length

        console.log(`Master pid: ${pid}`)
        console.log(`Starting ${numOfCpus} forks`)

        cpu.forEach(() => {
            cluster.fork();
        });
    } else {
        const id = cluster.worker?.id
        console.log(`Worker: ${id}, pid: ${pid}`);
        http.createServer(async (req, res) => {
            res.setHeader('Process-ID', pid);
            await routing(req, res);
        }).listen(port);
    }
};

createScalableServer();
