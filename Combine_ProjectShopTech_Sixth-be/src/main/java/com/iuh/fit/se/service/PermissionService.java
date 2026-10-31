package com.iuh.fit.se.service;

import com.iuh.fit.se.domain.dto.PermissionDTO;

import java.util.List;

public interface PermissionService {
    PermissionDTO createPermission(PermissionDTO permissionDTO);
    PermissionDTO updatePermission(Long id, PermissionDTO permissionDTO);
    void deletePermission(Long id);
    PermissionDTO getPermissionById(Long id);
    List<PermissionDTO> getAllPermissions();
    PermissionDTO getPermissionByName(String name);
}
