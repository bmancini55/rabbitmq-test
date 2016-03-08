let amqp = require('amqplib');

async function run() {
  let args = process.argv.slice(2);

  if (args.length == 0) {
    console.log('Usage: receive_logs_direct.js [info] [warning] [error]');
    process.exit(1);
  }

  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  let ex = await ch.assertExchange('direct_logs', 'direct', { durable: false });
  let q = await ch.assertQueue('', { exclusive: true});

  console.log(' [*] Waiting for logs. To exit press CTRL+C');

  args.forEach(function(severity) {
    ch.bindQueue(q.queue, ex.exchange, severity);
  });

  ch.consume(q.queue, (msg) => {
    console.log(' [x] %s: %s', msg.fields.routingKey, msg.content.toString());
  });
}

run().catch(console.log);