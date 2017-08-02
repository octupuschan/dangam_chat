package com.dangam.namu.core.aws.s3;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.servlet.http.Part;

import org.apache.commons.io.IOUtils;
import org.junit.Assert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

@Service
public class S3Wrapper {
	private Logger logger = LoggerFactory.getLogger(S3Wrapper.class);

	@Value("${dangam.namu.aws.s3.bucket}")
	private String bucket;

	@Value("${dangam.namu.aws.s3.region}")
	private String region;

	@Autowired
	private AmazonS3Client amazonS3Client;

	public PutObjectResult upload(Part part, String s3key, boolean isPrivate) {
		PutObjectResult putObjectResult = null;

		try {
			putObjectResult = upload( part.getInputStream(), part.getContentType(), part.getSize(), part.getSubmittedFileName(),	s3key, isPrivate);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return putObjectResult;
	}

	public PutObjectResult upload(InputStream fileStream, String contentType, long fileSize, String fileName,
			String s3key, boolean isPrivate) {
		logger.info("*************** S3Wrapper > awsUpload Start");

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(contentType);
		objectMetadata.setContentLength(fileSize);
		objectMetadata.setContentDisposition(String.format("attachment;filename=%s", fileName));

		PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, s3key, fileStream, objectMetadata);

		if (isPrivate) {
			putObjectRequest.setCannedAcl(CannedAccessControlList.Private);
		} else {
			putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
		}

		PutObjectResult putObjectResult = amazonS3Client.putObject(putObjectRequest);

		IOUtils.closeQuietly(fileStream);
		return putObjectResult;
	}

	public String getPresignedUrl(String s3key, String filename) throws UnsupportedEncodingException {
		Assert.assertNotNull("s3key empty!", s3key);
		Assert.assertNotNull("filename empty!", filename);

		Date expiration = new Date();
		long milliSeconds = expiration.getTime();
		milliSeconds += 1000 * 60 * 5; // Add 5minutes.
		expiration.setTime(milliSeconds);
		GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, s3key);
		generatePresignedUrlRequest.setMethod(HttpMethod.GET);
		generatePresignedUrlRequest.setExpiration(expiration);
		generatePresignedUrlRequest.addRequestParameter("response-content-disposition",
				"attachment;filename=\"" + new String(filename.getBytes("UTF-8"), "ISO-8859-1") + "\"");
		return amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest).toString();
	}

	public void delete(String s3key) {
		try {
			DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucket, s3key);
			amazonS3Client.deleteObject(deleteObjectRequest);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
