const q = 'workqueue';

let amqp = require('amqplib');

async function run() {
  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  let msg = process.argv.slice(2).join(' ') || 'Hello World';

  ch.assertQueue(q, { durable: true });
  ch.sendToQueue(q, new Buffer(msg), { persistant: true });
  console.log (' [x] Sent %s', msg);

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
};

run().catch(console.log);
