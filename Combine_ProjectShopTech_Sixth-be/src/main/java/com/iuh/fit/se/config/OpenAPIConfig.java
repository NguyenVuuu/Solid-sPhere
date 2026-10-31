package com.iuh.fit.se.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {
        @Bean
        public GroupedOpenApi groupedOpenAPI(@Value("${openapi.service.api-docs}") String apiDocs) {
            return GroupedOpenApi.builder()
                    .group(apiDocs) // identity/v3/api-docs/api-service
                    .packagesToScan("com.iuh.fit.se.controller")
                    .build();
        }

        @Bean
        public OpenAPI openAPI(
                @Value("${openapi.service.title}") String title,
                @Value("${openapi.service.description}") String description,
                @Value("${openapi.service.version}") String version,
                @Value("${openapi.service.serverName}") String serverName) {
            final String securitySchemeName = "bearerAuth";
            return new OpenAPI()
                    // Use the host from the browser address bar (localhost/127.0.0.1/deployed host).
                    .servers(List.of(new Server().url("/").description(serverName)))
                    .components(new Components()
                            .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                                            .type(SecurityScheme.Type.HTTP)
                                            .scheme("bearer")
                                            .bearerFormat("JWT")))
                    .security(List.of(new SecurityRequirement().addList(securitySchemeName)))//Dòng này để áp dụng xác thực JWT cho TẤT CẢ API endpoints
                    .info(new Info()
                            .title(title)
                            .description(description)
                            .version(version)
                            .license(new License().name("API License").url("https://springdoc.org")));
        }
    }
