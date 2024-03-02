package com.matheusarjc.postandcomments.models.user.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusarjc.postandcomments.models.user.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, UUID> {

    List<PostEntity> findByUserId(UUID userId);
}
