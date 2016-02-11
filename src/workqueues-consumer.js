const q = 'workqueue';

let amqp = require('amqplib');

async function run() {
  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);

  let conn = await amqp.connect('amqp://192.168.99.100');
  let ch = await conn.createChannel();
  ch.assertQueue(q, { durable: true });
  ch.prefetch(1);
  ch.consume(q, (msg) => {
    let secs = msg.content.toString().split('.').length - 1;
    console.log(' [x] Received %s', msg.content.toString());

    setTimeout(() => {
      console.log(' [x] Done');
      ch.ack(msg);
    }, secs * 1000);

  }, { noAck: false });
};

run().catch(console.log);
