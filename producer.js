const streamName = 'kinesis-testing-stream';
const AWS = require("aws-sdk");
const uuid = require('uuid');

const kinesis = new AWS.Kinesis({ region: 'eu-west-1', apiVersion: '2013-12-02' });


// const kinesisPutRecord = params => new Promise((resolve, reject) => {
//     console.log('put record: ', params)
//     kinesis.putRecord(params, (err, data) => {
//         if (err) {
//             return reject(err);
//         }
//         resolve(data);
//     });
// });

// async function putRecord(data) {
//     //const kinesis = new AWS.Kinesis();
//     const partitionKey = uuid.v1();
//     const record = {
//         Data: JSON.stringify(data),
//         PartitionKey: partitionKey,
//         StreamName: 'kinesis-testing-stream',
//     };
//     return kinesis.putRecord(record).promise().then(() => {
//         logger.info(`Data successfully written to Kinesis.\nPartitionKey: ${partitionKey}\nStreamName: ${streamName}`);
//     });
// }


let records = [];

for (let i = 0; i < 10; i++) {
    const data = {
        userId : i
    } ;

    record = {
        Data: JSON.stringify(data),
        PartitionKey: '1',
    };
    records.push(record);


    var recordsParams = {
        Records: records,
        StreamName: 'gdpr-kinesis-test'
    };


    kinesis.putRecords(recordsParams, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('success');
        }
    });

    records = [];
}




