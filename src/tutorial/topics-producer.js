let amqp = require('amqplib');

async function run() {
  let args = process.argv.slice(2);
  let key = (args.length > 0) ? args[0] : 'anonymous.info';
  let msg = args.slice(1).join(' ') || 'Hello World!';

  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  let ex = await ch.assertExchange('topic_log', 'topic', {durable: false});

  await ch.publish(ex.exchange, key, new Buffer(msg));
  console.log(' [x] Sent %s: %s', key, msg);
  conn.close();
}

run().catch(console.log);