package campus_resource_rescue.controller;

import campus_resource_rescue.model.Resource;
import campus_resource_rescue.model.User;
import campus_resource_rescue.service.ResourceService;
import campus_resource_rescue.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;
    private final UserRepository userRepository;

    public ResourceController(ResourceService resourceService,
                              UserRepository userRepository) {
        this.resourceService = resourceService;
        this.userRepository = userRepository;
    }

    // Add a new resource
    @PostMapping
    public ResponseEntity<?> addResource(@RequestBody Resource resource) {

        if (resource.getOwner() == null || resource.getOwner().getId() == null) {
            return ResponseEntity.badRequest()
                    .body("Owner ID is required");
        }

        User owner = userRepository.findById(resource.getOwner().getId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        resource.setOwner(owner);

        if (resource.getStatus() == null || resource.getStatus().isBlank()) {
            resource.setStatus("AVAILABLE");
        }

        Resource savedResource = resourceService.addResource(resource);

        return ResponseEntity.ok(savedResource);
    }

    // Get all resources
    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    // Get resource by ID
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return ResponseEntity.ok(resourceService.getResourceById(id));
    }

    // Delete resource
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {

        resourceService.deleteResource(id);

        return ResponseEntity.ok("Resource deleted successfully");
    }

    // Search by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Resource>> getByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                resourceService.getByCategory(category)
        );
    }

    // Search by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Resource>> getByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                resourceService.getByStatus(status)
        );
    }

    // Search by title
    @GetMapping("/title/{title}")
    public ResponseEntity<List<Resource>> getByTitle(
            @PathVariable String title) {

        return ResponseEntity.ok(
                resourceService.getByTitle(title)
        );
    }

    // Search by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Resource>> getByLocation(
            @PathVariable String location) {

        return ResponseEntity.ok(
                resourceService.getByLocation(location)
        );
    }
@PutMapping("/{id}/status")
public ResponseEntity<Resource> updateResourceStatus(
        @PathVariable Long id,
        @RequestParam String status) {

    return ResponseEntity.ok(
            resourceService.updateStatus(id, status)
    );
}
}