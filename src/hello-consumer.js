const q = 'hello';

let amqp = require('amqplib');

async function run() {
  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);
  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  ch.assertQueue(q, { durable: false });
  ch.consume(q, (msg) => {
    console.log(' [x] Received %s', msg.content.toString());
  }, {noAck: true});
};

run().catch(console.log);
