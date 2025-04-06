const { kafka } = require('./client');
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();

  await consumer.subscribe({
    topic: 'rider-updates',
    fromBeginning: true
  });

  // Log group join (rebalance)
  consumer.on(consumer.events.GROUP_JOIN, e => {
    console.log(`🌀 [${group}] Rebalanced. Leader: ${e.payload.isLeader}`);
    console.log(`🔄 Assigned partitions:`, e.payload.memberAssignment);
  });

  await consumer.run({
    eachBatchAutoResolve: false, // required when you use resolveOffset manually
    eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
      for (const message of batch.messages) {
        if (!isRunning() || isStale()) break;

        console.log(
          `[${group}:${batch.topic}]:PART:${batch.partition}:`,
          message.value.toString()
        );

        resolveOffset(message.offset);
        await heartbeat(); // keep the session alive during long processing
      }
    }
  });
}

init().catch(err => {
  console.error('❌ Consumer error:', err);
});
