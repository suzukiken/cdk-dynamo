#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkdynamoStack } from '../lib/cdkdynamo-stack';
import { CdkdynamoGsiStack } from '../lib/cdkdynamo-gsi-stack';
import { CdkdynamoFixedscaleStack } from '../lib/cdkdynamo-fixedscale-stack';
import { CdkdynamoAutoscaleStack } from '../lib/cdkdynamo-autoscale-stack';

const app = new cdk.App();
new CdkdynamoStack(app, 'CdkdynamoStack');
new CdkdynamoGsiStack(app, 'CdkdynamoGsiStack');
new CdkdynamoFixedscaleStack(app, 'CdkdynamoFixedscaleStack');
new CdkdynamoAutoscaleStack(app, 'CdkdynamoAutoscaleStack');
