import boto3
import botocore
import os
from ..config import Config
import uuid

# BUCKET_NAME = os.environ.get("AWS_S3_BUCKET")
BUCKET_NAME = riff-raff
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_RIFF_EXTENSIONS = {'mp3', 'm4a'}
ALLOWED_IMG_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
    "s3",
    # aws_access_key_id=os.environ.get("AWS_S3_ACCESS_KEY"),
    # aws_secret_access_key=os.environ.get("AWS_S3_SECRET_ACCESS_KEY"),
    aws_access_key_id=Config.AWS_S3_ACCESS_KEY,
    aws_secret_access_key=Config.AWS_S3_SECRET_ACCESS_KEY,
)

def allowed_riff_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_RIFF_EXTENSIONS

def allowed_img_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_IMG_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        # return {"errors": str(e)}
        return {"errors": str(e), "bucket": str(BUCKET_NAME)}

    return {"url": f"{S3_LOCATION}{file.filename}"}