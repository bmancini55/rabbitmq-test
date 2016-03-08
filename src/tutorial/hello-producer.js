const q = 'hello';

let amqp = require('amqplib');

async function run() {
  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  ch.assertQueue(q, { durable: false });
  ch.sendToQueue(q, new Buffer('Hello World!'));
  console.log (' [x] Sent \'Hello World!\'');
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
};

run().catch(console.log);
