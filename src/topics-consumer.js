let amqp = require('amqplib');

async function run() {
  let args = process.argv.slice(2);

  if (args.length == 0) {
    console.log('Usage: topics-consumer.js <facility>.<severity>');
    process.exit(1);
  }

  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  let ex = await ch.assertExchange('topic_log', 'topic', {durable: false});
  let q = await ch.assertQueue('', {exclusive: true});
  console.log(' [*] Waiting for logs. To exit press CTRL+C');

  args.forEach(function(key) {
    ch.bindQueue(q.queue, ex.exchange, key);
  });

  ch.consume(q.queue, (msg) => {
    console.log(' [x] %s: %s', msg.fields.routingKey, msg.content.toString());
  }, {noAck:true});
}

run().catch(console.log);