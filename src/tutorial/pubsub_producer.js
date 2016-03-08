let amqp = require('amqplib');

async function run() {
  let msg = process.argv.slice(2).join(' ') || 'Hello World!';

  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  let ex = await ch.assertExchange('logs', 'fanout', { durable: false });

  ch.publish(ex.exchange, '', new Buffer(msg));
  console.log(' [x] Sent %s', msg);

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
}

run().catch(console.log);