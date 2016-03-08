
let amqp = require('amqplib');
let ip = process.argv[2] || '192.168.99.100';
let q = process.argv[3] || 'test';

async function run() {
  let conn = await amqp.connect('amqp://' + ip);
  let ch = await conn.createChannel();
  conn.on('error', console.log);
  ch.on('error', console.log);

  let content = new Buffer(q);

  await ch.assertQueue(q, { durable: false });

  let consumed = 0;
  ch.consume(q, (msg) => {
    consumed += 1;
    if(consumed % 10000 === 0) {
      console.log(consumed);
    }
  }, { noAck: true });
};

run().catch(console.log);
