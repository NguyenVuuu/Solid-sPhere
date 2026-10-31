package com.iuh.fit.se.repository;

import com.iuh.fit.se.domain.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
    
    boolean existsByName(String name);
    
    // Count users by role
    @Query("SELECT COUNT(u) FROM User u WHERE u.role.id = :roleId")
    Long countUsersByRoleId(@Param("roleId") Long roleId);
    
    // Find roles by name containing
    @Query("SELECT r FROM Role r WHERE r.name LIKE %:keyword% OR r.description LIKE %:keyword%")
    List<Role> searchByKeyword(@Param("keyword") String keyword);
    
    // Find roles with permissions count
    @Query("SELECT r.id, r.name, COUNT(p) FROM Role r LEFT JOIN r.permissions p " +
           "GROUP BY r.id, r.name ORDER BY COUNT(p) DESC")
    List<Object[]> findRolesWithPermissionCount();
    
    // Find roles with specific permission
    @Query("SELECT r FROM Role r JOIN r.permissions p WHERE p.id = :permissionId")
    List<Role> findByPermissionId(@Param("permissionId") Long permissionId);
    
    // Find roles with specific permission name
    @Query("SELECT r FROM Role r JOIN r.permissions p WHERE p.name = :permissionName")
    List<Role> findByPermissionName(@Param("permissionName") String permissionName);
    
    // Find roles with active users
    @Query("SELECT DISTINCT r FROM Role r JOIN r.users u WHERE u.status = 'ACTIVE'")
    List<Role> findRolesWithActiveUsers();
    
    // Count roles with no users
    @Query("SELECT COUNT(r) FROM Role r WHERE r.users IS EMPTY")
    Long countEmptyRoles();
    
    // Find most popular role (most users)
    @Query("SELECT r.id, r.name, COUNT(u) FROM Role r LEFT JOIN r.users u " +
           "GROUP BY r.id, r.name ORDER BY COUNT(u) DESC")
    List<Object[]> findMostPopularRoles(org.springframework.data.domain.Pageable pageable);
    
    // Find roles with minimum permission count
    @Query("SELECT r FROM Role r WHERE SIZE(r.permissions) >= :minCount")
    List<Role> findRolesWithMinPermissions(@Param("minCount") Integer minCount);
    
    // Get role statistics
    @Query("SELECT r.name, COUNT(DISTINCT u), COUNT(DISTINCT p) FROM Role r " +
           "LEFT JOIN r.users u LEFT JOIN r.permissions p GROUP BY r.name")
    List<Object[]> getRoleStatistics();
}
