package campus_resource_rescue.repository;

import campus_resource_rescue.model.ResourceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRequestRepository
        extends JpaRepository<ResourceRequest, Long> {

    List<ResourceRequest> findByRequesterId(Long requesterId);

    List<ResourceRequest> findByResourceId(Long resourceId);

    List<ResourceRequest> findByStatusIgnoreCase(String status);

    List<ResourceRequest> findByResourceOwnerId(Long ownerId);
}