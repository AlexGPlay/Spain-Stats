import * as aws from "@pulumi/aws";

export const geojsonsBucket = new aws.s3.Bucket("static-geojsons");
export const webBucket = new aws.s3.Bucket("web-files");
