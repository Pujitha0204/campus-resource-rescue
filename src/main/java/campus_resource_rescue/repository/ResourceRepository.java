package campus_resource_rescue.repository;

import campus_resource_rescue.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByCategoryIgnoreCase(String category);

    List<Resource> findByStatusIgnoreCase(String status);

    List<Resource> findByTitleContainingIgnoreCase(String title);

    List<Resource> findByLocationIgnoreCase(String location);
}