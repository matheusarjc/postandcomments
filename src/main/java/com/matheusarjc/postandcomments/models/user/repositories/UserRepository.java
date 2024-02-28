package com.matheusarjc.postandcomments.models.user.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusarjc.postandcomments.models.user.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

}
