
package com.teleauora.portal.service;

import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.storage.blob.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class BlobService {

  private final BlobServiceClient serviceClient;
  private final String container;

  public BlobService(@Value("${storage.account-name}") String accountName,
                     @Value("${storage.container-name}") String container){
    this.container = container;
    this.serviceClient = new BlobServiceClientBuilder()
      .endpoint("https://" + accountName + ".blob.core.windows.net")
      .credential(new DefaultAzureCredentialBuilder().build())
      .buildClient();
  }

  public BlobClient getBill(String path){
    return serviceClient.getBlobContainerClient(container).getBlobClient(path);
  }
}
