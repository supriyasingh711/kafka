
const {kafka}=require('./client')

async function init() {
    const admin=kafka.admin();
    console.log("Admin Connecting...")
    admin.connect();
    console.log("Admin Connected Successfully!")
     console.log("Creating topics[rider-updates]")
   await admin.createTopics({
        topics:[{
            topic:'rider-updates',
            numPartitions:2,
        }]
    });
    console.log("Topics Created Successfully[rider-updates]")
    console.log("Disconnecting admin..")
    await admin.disconnect();
    }

    init();

