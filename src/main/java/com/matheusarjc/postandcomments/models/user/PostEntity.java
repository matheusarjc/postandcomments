package com.matheusarjc.postandcomments.models.user;

import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class PostEntity {

    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false)
    @Id
    private UUID id;

    @Column(name = "user_id", nullable = false) // Ensure this matches your database column name
    private UUID userId;

    @Column(length = 5000)
    private String textContent;

    private String photoUrl;

    public PostEntity() {
    }

    public PostEntity(UUID id, UUID userId, String textContent, String photoUrl) {
        this.id = id;
        this.userId = userId;
        this.textContent = textContent;
        this.photoUrl = photoUrl;
    }

    public UUID getUuid() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getTextContent() {
        return textContent;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

}
