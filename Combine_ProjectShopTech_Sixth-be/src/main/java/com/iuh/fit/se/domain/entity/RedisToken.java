package com.iuh.fit.se.domain.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("RedisHas")
@Builder
public class RedisToken {

    @Id
    private String jwtId;

    @TimeToLive
    private long ttl;

}