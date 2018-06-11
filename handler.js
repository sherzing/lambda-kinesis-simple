
let AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
//const dynamodb = new AWS.DynamoDB();
const tableName = process.env.handler_table;

async function kinesisTest(event, context, callback) {
  console.log(`Received event:\n${JSON.stringify(event, null, 2)}`);
  console.log('table name: ', table_name);

  await Promise.all(event.Records.map((record) => {
    if (!record) {
      console.log(`Record is falsy. Event received:\n${JSON.stringify(event, null, 2)}`);
      return;
    } else if (!record.kinesis) {
      console.log(`Record does not have kinesis field. Event received:\n${JSON.stringify(event, null, 2)}`);
      return;
    }

    const { data } = record.kinesis;
    const jsonStr = new Buffer(data, 'base64').toString('utf-8');
    const jsonData = JSON.parse(jsonStr);
    console.log('jsonData userId: ', jsonData.userId);

    let req = {
      TableName: tableName,
      Item: { 
        UserId: jsonData.userId 
      },
    };

    await dynamodb.put(req).promise().then(() => console.log("item added"));
    

  })).then(() => {
    console.log('resolved');
  }).catch(() => { console.error('failed');
  });
};



module.exports = {
  kinesisTest,
}