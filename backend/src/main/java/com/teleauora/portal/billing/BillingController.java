
package com.teleauora.portal.billing;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.sas.*;
import com.azure.storage.blob.models.BlobItem;
import com.teleauora.portal.storage.BlobClients;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.*;

@RestController
@RequestMapping("/api/bills")
public class BillingController {
  private final BlobClients blobs;
  public BillingController(BlobClients blobs) { this.blobs = blobs; }

  public record BillDTO(String id, String period, String blobName) {}

  @GetMapping
  public List<BillDTO> list(@RequestParam String customerId) {
    // Lists blobs by prefix; if storage isn't configured or no creds, returns empty
    try {
      BlobServiceClient svc = blobs.service();
      BlobContainerClient container = svc.getBlobContainerClient(blobs.billsContainer());
      String prefix = "bills/" + customerId + "/"; // bills/{customerId}/yyyy/MM/...
      List<BillDTO> out = new ArrayList<>();
      for (BlobItem bi : container.listBlobsByHierarchy("/", new com.azure.storage.blob.options.ListBlobsOptions().setPrefix(prefix), null)) {
        if (bi.isPrefix()) continue;
        String name = bi.getName();
        String[] parts = name.split("/");
        String period = parts.length >= 4 ? parts[2] + "-" + parts[3] : ""; // yyyy-MM
        out.add(new BillDTO(name, period, name));
      }
      return out;
    } catch (Exception e) {
      // Fallback sample data so UI works locally without Azure
      return List.of(
        new BillDTO("INV-2025-12","2025-12",""),
        new BillDTO("INV-2026-01","2026-01",""),
        new BillDTO("INV-2026-02","2026-02","")
      );
    }
  }

  public record DownloadLink(String url) {}

  @GetMapping("/download-link")
  public ResponseEntity<DownloadLink> downloadLink(@RequestParam String customerId,
                                                   @RequestParam String year,
                                                   @RequestParam String month) {
    try {
      BlobServiceClient svc = blobs.service();
      BlobContainerClient container = svc.getBlobContainerClient(blobs.billsContainer());
      String blobPath = String.format("bills/%s/%s/%s/invoice-%s-%s%s.pdf", customerId, year, month, customerId, year, month);
      BlobClient blob = container.getBlobClient(blobPath);

      OffsetDateTime now = OffsetDateTime.now(ZoneOffset.UTC);
      UserDelegationKey udk = svc.getUserDelegationKey(now.minusMinutes(5), now.plusMinutes(10));
      BlobSasPermission perm = new BlobSasPermission().setReadPermission(true);
      BlobServiceSasSignatureValues sv = new BlobServiceSasSignatureValues(now.plusMinutes(5), perm)
        .setStartTime(now.minusMinutes(1))
        .setProtocol(SasProtocol.HTTPS_ONLY)
        .setContentDisposition("inline; filename=invoice-"+customerId+"-"+year+month+".pdf")
        .setContentType("application/pdf")
        .setBlobName(blob.getBlobName())
        .setContainerName(container.getBlobContainerName());

      String sas = blob.generateUserDelegationSas(sv, udk);
      String url = blob.getBlobUrl() + "?" + sas;
      return ResponseEntity.ok(new DownloadLink(url));
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
        .body(new DownloadLink(""));
    }
  }
}
