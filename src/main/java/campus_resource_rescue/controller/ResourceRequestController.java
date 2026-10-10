package campus_resource_rescue.controller;

import campus_resource_rescue.model.ResourceRequest;
import campus_resource_rescue.model.Resource;
import campus_resource_rescue.model.User;
import campus_resource_rescue.repository.ResourceRepository;
import campus_resource_rescue.repository.UserRepository;
import campus_resource_rescue.service.ResourceRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class ResourceRequestController {

    private final ResourceRequestService requestService;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    public ResourceRequestController(
            ResourceRequestService requestService,
            ResourceRepository resourceRepository,
            UserRepository userRepository) {

        this.requestService = requestService;
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
    }

    // Create a resource request
    @PostMapping
    public ResponseEntity<?> createRequest(
            @RequestParam Long resourceId,
            @RequestParam Long requesterId) {

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() ->
                        new RuntimeException("Resource not found"));

        User requester = userRepository.findById(requesterId)
                .orElseThrow(() ->
                        new RuntimeException("Requester not found"));

        ResourceRequest request =
                new ResourceRequest("PENDING", resource, requester);

        return ResponseEntity.ok(
                requestService.createRequest(request)
        );
    }

    // Get all requests - Admin
    @GetMapping("/all")
    public ResponseEntity<List<ResourceRequest>> getAllRequests() {

        return ResponseEntity.ok(
                requestService.getAllRequests()
        );
    }

    // Get requests for resources owned by a particular user
    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<ResourceRequest>> getRequestsForOwner(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                requestService.getRequestsForUser(userId)
        );
    }

    // Get requests made by a particular student
    @GetMapping("/requester/{requesterId}")
    public ResponseEntity<List<ResourceRequest>> getByRequester(
            @PathVariable Long requesterId) {

        return ResponseEntity.ok(
                requestService.getRequestsByRequester(requesterId)
        );
    }

    // Get requests for a particular resource
    @GetMapping("/resource/{resourceId}")
    public ResponseEntity<List<ResourceRequest>> getByResource(
            @PathVariable Long resourceId) {

        return ResponseEntity.ok(
                requestService.getRequestsByResource(resourceId)
        );
    }

    // Get request by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResourceRequest> getRequestById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                requestService.getRequestById(id)
        );
    }

    // Update request status
    @PutMapping("/{id}/status")
    public ResponseEntity<ResourceRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                requestService.updateStatus(id, status)
        );
    }
}