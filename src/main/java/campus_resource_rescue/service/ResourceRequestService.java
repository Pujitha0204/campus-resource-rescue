package campus_resource_rescue.service;

import campus_resource_rescue.model.Resource;
import campus_resource_rescue.model.ResourceRequest;
import campus_resource_rescue.repository.ResourceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceRequestService {

    private final ResourceRequestRepository requestRepository;

    public ResourceRequestService(ResourceRequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    // Create a request
    public ResourceRequest createRequest(ResourceRequest request) {

        List<ResourceRequest> existingRequests =
                requestRepository.findByResourceId(
                        request.getResource().getId()
                );

        for (ResourceRequest existing : existingRequests) {

            if (existing.getRequester().getId()
                    .equals(request.getRequester().getId())
                    && !existing.getStatus().equalsIgnoreCase("REJECTED")) {

                throw new RuntimeException(
                        "You have already requested this resource"
                );
            }
        }

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            request.setStatus("PENDING");
        }

        return requestRepository.save(request);
    }

    // Get requests for resources owned by a particular student
    public List<ResourceRequest> getRequestsForUser(Long userId) {
        return requestRepository.findByResourceOwnerId(userId);
    }

    // Get ALL requests - Admin
    public List<ResourceRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    // Get request by ID
    public ResourceRequest getRequestById(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));
    }

    // Get requests made by a student
    public List<ResourceRequest> getRequestsByRequester(Long requesterId) {
        return requestRepository.findByRequesterId(requesterId);
    }

    // Get requests for a particular resource
    public List<ResourceRequest> getRequestsByResource(Long resourceId) {
        return requestRepository.findByResourceId(resourceId);
    }

    // Update request status
    public ResourceRequest updateStatus(Long id, String status) {

        ResourceRequest request = getRequestById(id);

        request.setStatus(status);

        Resource resource = request.getResource();

        if ("ACCEPTED".equalsIgnoreCase(status)) {
            resource.setStatus("RESERVED");
        }

        if ("REJECTED".equalsIgnoreCase(status)) {
            resource.setStatus("AVAILABLE");
        }

        return requestRepository.save(request);
    }
}