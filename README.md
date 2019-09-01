# Upload files directly from the browser to S3


## AWS configuration

### S3 configuration
Create a bucket on S3 with folliwng cros:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>


### IAM setting
Create user with programmatic access, following is the IAM policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Put*"
            ],
            "Resource": [
                "arn:aws:s3:::<<Bucket Name>>"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:Put*"
            ],
            "Resource": [
                "arn:aws:s3:::<<Bucket Name>>/*"
            ]
        }
    ]
}

## Deploy en Netlify

### Environment variables need to change in notlify.toml
AWS_S3_ACCESS_KEY = "aws acces key"
AWS_S3_SECRET_KEY = "secret key"
AWS_AZ_REGION = "aws region"
AWS_S3_BUCKET = "s3 bucket"

### Deploy en Netlify
Connect github with netlify and publish
Optional (Enable domain,HTTPS etc)
