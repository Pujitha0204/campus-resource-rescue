package campus_resource_rescue.service;

import campus_resource_rescue.model.Resource;
import campus_resource_rescue.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    // Add a new resource
    public Resource addResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    // Get all resources
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    // Get resource by ID
    public Resource getResourceById(Long id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
    }

    // Delete resource
    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    // Search by category
    public List<Resource> getByCategory(String category) {
        return resourceRepository.findByCategoryIgnoreCase(category);
    }

    // Search by status
    public List<Resource> getByStatus(String status) {
        return resourceRepository.findByStatusIgnoreCase(status);
    }

    // Search by title
    public List<Resource> getByTitle(String title) {
        return resourceRepository.findByTitleContainingIgnoreCase(title);
    }

    // Search by location
    public List<Resource> getByLocation(String location) {
        return resourceRepository.findByLocationIgnoreCase(location);
    }
public Resource updateStatus(Long id, String status) {

    Resource resource = getResourceById(id);

    resource.setStatus(status);

    return resourceRepository.save(resource);
}
}