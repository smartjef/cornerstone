import { S3Client, DeleteObjectCommand, PutBucketPolicyCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const BUCKET = process.env.MINIO_BUCKET_NAME!
const PUBLIC_URL = process.env.MINIO_PUBLIC_URL!

export const s3 = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT!,
  region: 'us-east-1', // MinIO ignores region but SDK requires it
  credentials: {
    accessKeyId: process.env.MINIO_ROOT_USER!,
    secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
  },
  forcePathStyle: true, // Required for MinIO
})

/**
 * Ensures the bucket has a public read policy.
 * This should be called during app initialization or first upload.
 */
export async function ensureBucketPublic() {
  const publicPolicy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicRead',
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${BUCKET}/*`],
      },
    ],
  }

  try {
    await s3.send(new PutBucketPolicyCommand({
      Bucket: BUCKET,
      Policy: JSON.stringify(publicPolicy),
    }))
    console.log(`Bucket "${BUCKET}" policy set to public read.`)
  } catch (err) {
    console.error('Failed to set bucket policy:', err)
  }
}

export async function uploadToStorage(
  buffer: Buffer,
  filename: string,
  mimeType: string,
): Promise<string> {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: BUCKET,
      Key: filename,
      Body: buffer,
      ContentType: mimeType,
      ACL: 'public-read',
    },
  })
  await upload.done()
  return `${PUBLIC_URL}/${BUCKET}/${filename}`
}

export async function deleteFromStorage(filename: string): Promise<void> {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: filename }))
}
