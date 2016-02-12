let amqp = require('amqplib');

async function run() {
  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  let ex = await ch.assertExchange('logs', 'fanout', { durable: false });
  let q = await ch.assertQueue('', { exclusive: true });

  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);
  ch.bindQueue(q.queue, ex.exchange, '');
  ch.consume(q.queue, (msg) => {
    console.log(' [x] %s', msg.content.toString());
  }, { noAck: true });
}

run().catch(console.log);