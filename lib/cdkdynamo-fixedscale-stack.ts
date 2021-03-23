import * as cdk from '@aws-cdk/core';
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class CdkdynamoFixedscaleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX = id.toLowerCase().replace('stack', '')
	
    const table = new dynamodb.Table(this, "table", {
      tableName: PREFIX + "-table",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      writeCapacity: 1,
      readCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: true
    })

  }
}
