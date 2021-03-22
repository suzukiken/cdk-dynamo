#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkdynamoStack } from '../lib/cdkdynamo-stack';

const app = new cdk.App();
new CdkdynamoStack(app, 'CdkdynamoStack');
