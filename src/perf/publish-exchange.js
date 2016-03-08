
let amqp = require('amqplib');
let ip = process.argv[2] || '192.168.99.100';
let q = process.argv[3] || 'test';

async function run() {
  let conn = await amqp.connect('amqp://' + ip);
  let ch = await conn.createChannel();

  let content = new Buffer(q);

  await ch.assertExchange(q, 'direct', { durable: false });
  await ch.assertQueue(q, { durable: false });
  await ch.bindQueue(q, q);

  let start = new Date();
  for(let i=0; i<1000000; i++) {
    ch.publish(q, '', content);
  }
  ch.on('error', console.log);
  conn.on('error', console.log);
  ch.on('drain', () => {
    let stop = new Date();
    console.log(stop - start);
  });

};

run().catch(console.log);

