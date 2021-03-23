import * as cdk from '@aws-cdk/core';
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class CdkdynamoGsiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX = id.toLowerCase().replace('stack', '')
	
    const table = new dynamodb.Table(this, "table", {
      tableName: PREFIX + "-table",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "updated",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: true
    })
    
    table.addGlobalSecondaryIndex({
      indexName: "sku-pcs-index",
      partitionKey: {
        name: "sku",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "pcs",
        type: dynamodb.AttributeType.NUMBER,
      },
    });

  }
}
