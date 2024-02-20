const { addReward } = require('./controller/validation');
const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
  try {
    await addReward();
  } catch (error) {
    console.error('Error occurred during addReward:', error);
  }
});
