import * as cdk from '@aws-cdk/core';
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class CdkdynamoAutoscaleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX = id.toLowerCase().replace('stack', '')
    const MIN_CAPACITY = 1;
    const MAX_CAPACITY = 100;
    const UTILIZATION = 70;
	
    const table = new dynamodb.Table(this, "table", {
      tableName: PREFIX + "-table",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: true,
      billingMode: dynamodb.BillingMode.PROVISIONED,
    })

    const readScaling = table.autoScaleReadCapacity({
      minCapacity: MIN_CAPACITY,
      maxCapacity: MAX_CAPACITY,
    });
    
    const writeScaling = table.autoScaleWriteCapacity({
      minCapacity: MIN_CAPACITY,
      maxCapacity: MAX_CAPACITY,
    });

    readScaling.scaleOnUtilization({
      targetUtilizationPercent: UTILIZATION,
    });

    writeScaling.scaleOnUtilization({
      targetUtilizationPercent: UTILIZATION,
    });
  }
}


