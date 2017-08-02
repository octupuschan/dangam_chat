package com.dangam.namu.core.aws.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3Client;

@Configuration
public class AWSConfiguration {

  @Value("${dangam.namu.aws.s3.credentials.accessKey}")
  private String accessKey;

  @Value("${dangam.namu.aws.s3.credentials.secretKey}")
  private String secretKey;

  @Value("${dangam.namu.aws.s3.region}")
  private String region;

  @Bean
  public BasicAWSCredentials basicAWSCredentials() {
    return new BasicAWSCredentials(accessKey, secretKey);
  }

  @Bean
  public AmazonS3Client amazonS3Client(AWSCredentials awsCredentials) {
    AmazonS3Client amazonS3Client = new AmazonS3Client(awsCredentials);
    amazonS3Client.setRegion(Region.getRegion(Regions.fromName(region)));
    return amazonS3Client;
  }
}
