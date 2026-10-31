package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(String name);
    
    boolean existsByName(String name);
    
    // Find permissions by name containing
    @Query("SELECT p FROM Permission p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Permission> searchByKeyword(@Param("keyword") String keyword);
    
    // Find permissions by role
    @Query("SELECT p FROM Permission p JOIN p.roles r WHERE r.id = :roleId")
    List<Permission> findByRoleId(@Param("roleId") Long roleId);
    
    // Find permissions by role name
    @Query("SELECT p FROM Permission p JOIN p.roles r WHERE r.name = :roleName")
    List<Permission> findByRoleName(@Param("roleName") String roleName);
    
    // Count permissions by role
    @Query("SELECT COUNT(p) FROM Permission p JOIN p.roles r WHERE r.id = :roleId")
    Long countByRoleId(@Param("roleId") Long roleId);
    
    // Find permissions not assigned to any role
    @Query("SELECT p FROM Permission p WHERE p.roles IS EMPTY")
    List<Permission> findUnassignedPermissions();
    
    // Count unassigned permissions
    @Query("SELECT COUNT(p) FROM Permission p WHERE p.roles IS EMPTY")
    Long countUnassignedPermissions();
    
    // Find most used permissions (assigned to most roles)
    @Query("SELECT p.id, p.name, COUNT(r) FROM Permission p LEFT JOIN p.roles r " +
           "GROUP BY p.id, p.name ORDER BY COUNT(r) DESC")
    List<Object[]> findMostUsedPermissions(org.springframework.data.domain.Pageable pageable);
    
    // Find permissions assigned to multiple roles
    @Query("SELECT p FROM Permission p WHERE SIZE(p.roles) > 1")
    List<Permission> findSharedPermissions();
    
    // Get permission usage statistics
    @Query("SELECT p.name, COUNT(DISTINCT r) FROM Permission p LEFT JOIN p.roles r " +
           "GROUP BY p.name ORDER BY COUNT(DISTINCT r) DESC")
    List<Object[]> getPermissionStatistics();
    
    // Find permissions by user
    @Query("SELECT DISTINCT p FROM Permission p JOIN p.roles r JOIN r.users u WHERE u.id = :userId")
    List<Permission> findByUserId(@Param("userId") Long userId);
}
