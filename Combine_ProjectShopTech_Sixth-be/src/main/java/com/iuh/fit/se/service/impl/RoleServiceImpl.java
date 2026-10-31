package com.iuh.fit.se.service.impl;

import com.iuh.fit.se.domain.dto.RoleDTO;
import com.iuh.fit.se.domain.entity.Permission;
import com.iuh.fit.se.domain.entity.Role;
import com.iuh.fit.se.repository.PermissionRepository;
import com.iuh.fit.se.repository.RoleRepository;
import com.iuh.fit.se.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {
    
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {
        Role role = convertToEntity(roleDTO);
        Role savedRole = roleRepository.save(role);
        return convertToDTO(savedRole);
    }

    @Override
    public RoleDTO updateRole(Long id, RoleDTO roleDTO) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
        
        role.setName(roleDTO.getName());
        role.setDescription(roleDTO.getDescription());
        
        if (roleDTO.getPermissionIds() != null) {
            Set<Permission> permissions = new HashSet<>();
            for (Long permId : roleDTO.getPermissionIds()) {
                Permission permission = permissionRepository.findById(permId)
                        .orElseThrow(() -> new RuntimeException("Permission not found"));
                permissions.add(permission);
            }
            role.setPermissions(permissions);
        }
        
        Role updatedRole = roleRepository.save(role);
        return convertToDTO(updatedRole);
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public RoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
        return convertToDTO(role);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleDTO> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RoleDTO getRoleByName(String name) {
        Role role = roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role not found with name: " + name));
        return convertToDTO(role);
    }

    @Override
    public void assignPermissionsToRole(Long roleId, List<Long> permissionIds) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        Set<Permission> permissions = new HashSet<>();
        for (Long permId : permissionIds) {
            Permission permission = permissionRepository.findById(permId)
                    .orElseThrow(() -> new RuntimeException("Permission not found"));
            permissions.add(permission);
        }
        
        role.setPermissions(permissions);
        roleRepository.save(role);
    }

    private RoleDTO convertToDTO(Role role) {
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setName(role.getName());
        dto.setDescription(role.getDescription());
        
        if (role.getPermissions() != null) {
            Set<Long> permissionIds = role.getPermissions().stream()
                    .map(Permission::getId)
                    .collect(Collectors.toSet());
            dto.setPermissionIds(permissionIds);
        }
        
        return dto;
    }

    private Role convertToEntity(RoleDTO dto) {
        Role role = new Role();
        role.setName(dto.getName());
        role.setDescription(dto.getDescription());
        
        if (dto.getPermissionIds() != null) {
            Set<Permission> permissions = new HashSet<>();
            for (Long permId : dto.getPermissionIds()) {
                Permission permission = permissionRepository.findById(permId)
                        .orElseThrow(() -> new RuntimeException("Permission not found"));
                permissions.add(permission);
            }
            role.setPermissions(permissions);
        }
        
        return role;
    }
}
