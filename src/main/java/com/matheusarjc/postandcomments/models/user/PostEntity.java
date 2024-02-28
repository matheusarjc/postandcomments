package com.matheusarjc.postandcomments.models.user;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PostEntity {

    @Id
    private UUID id;

    @Column(nullable = false)
    private Long userId; // Assuming you're not implementing full authentication yet

    @Column(length = 5000)
    private String textContent;

    private String photoUrl;

    public PostEntity() {
    }

    public PostEntity(UUID id, Long userId, String textContent, String photoUrl) {
        this.id = id;
        this.userId = userId;
        this.textContent = textContent;
        this.photoUrl = photoUrl;
    }

    public UUID getUuid() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getTextContent() {
        return textContent;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

}
