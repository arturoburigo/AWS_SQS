import { CreateQueueCommand, SendMessageCommand, ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import 'dotenv/config'

const client = new SQSClient({
    credentials: {
        accessKeyId: 'AKIAUXGATNL4ELWZ75P4',
        secretAccessKey: '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'
    },
    region: 'us-east-1'
});
const SQS_QUEUE_NAME = "arturo_sqs";
const SQS_QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/324673956600/arturo_sqs'

async function createSNSQueue(sqsQueueName = SQS_QUEUE_NAME) {
    const createsnsqueue = new CreateQueueCommand({
        QueueName: sqsQueueName,
        Attributes: {
            DelaySeconds: "60",
            MessageRetentionPeriod: "86400",
        },
    });

    const response = await client.send(createsnsqueue);
    console.log(response);
    return response;
};

async function sendSQSMessage(sqsQueueUrl = SQS_QUEUE_URL) {
    const sendQueueMessage = new SendMessageCommand({
        QueueUrl: sqsQueueUrl,
        DelaySeconds: 10,
        MessageBody:
            "Just Testing"
    })

    const response = await client.send(sendQueueMessage)
    console.log(response)
    return response
}

async function receiveSQSMessage() {

}

createSNSQueue()
sendSQSMessage()