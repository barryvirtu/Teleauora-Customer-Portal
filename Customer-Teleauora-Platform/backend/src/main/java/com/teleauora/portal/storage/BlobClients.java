
package com.teleauora.portal.storage;

import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BlobClients {
  private final BlobServiceClient serviceClient;
  private final String billsContainer;

  public BlobClients(@Value("${storage.account-name}") String accountName,
                     @Value("${storage.bills-container}") String billsContainer) {
    this.billsContainer = billsContainer;
    String endpoint = "https://" + accountName + ".blob.core.windows.net";
    this.serviceClient = new BlobServiceClientBuilder()
      .endpoint(endpoint)
      .credential(new DefaultAzureCredentialBuilder().build())
      .buildClient();
  }

  public BlobServiceClient service() { return serviceClient; }
  public String billsContainer() { return billsContainer; }
}
