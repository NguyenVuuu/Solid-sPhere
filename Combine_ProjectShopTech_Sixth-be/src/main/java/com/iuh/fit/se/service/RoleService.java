package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.RoleDTO;

import java.util.List;

public interface RoleService {
    RoleDTO createRole(RoleDTO roleDTO);
    RoleDTO updateRole(Long id, RoleDTO roleDTO);
    void deleteRole(Long id);
    RoleDTO getRoleById(Long id);
    List<RoleDTO> getAllRoles();
    RoleDTO getRoleByName(String name);
    void assignPermissionsToRole(Long roleId, List<Long> permissionIds);
}
