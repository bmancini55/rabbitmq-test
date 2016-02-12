let amqp = require('amqplib');

async function run() {
  let args = process.argv.slice(2);
  let msg = args.slice(1).join(' ') || 'Hello World!';
  let severity = (args.length > 0) ? args[0] : 'info';

  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  await ch.assertExchange('direct_logs', 'direct', { durable: false });

  ch.publish('direct_logs', severity, new Buffer(msg));
  console.log(' [x] Sent %s: %s', severity, msg);

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
}

run().catch(console.log);