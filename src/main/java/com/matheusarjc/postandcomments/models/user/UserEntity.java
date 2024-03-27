package com.matheusarjc.postandcomments.models.user;

import java.util.UUID;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@Entity
public class UserEntity {

    @Id
    private UUID id = UUID.randomUUID();

    @Column(name = "name")
    private String name;

    @Email(message = "O campo [email] deve conter um e-mail válido.")
    private String email;

    @Length(min = 8, max = 20)
    private String password;

    @Column(name = "photo_url")
    private String photoUrl; // URL da foto do perfil

    @Column(name = "bio", length = 1000) // Assumindo que a bio pode ter até 1000 caracteres
    private String bio;

    @Column(name = "personal_link")
    private String personalLink; // Link pessoal

    public UserEntity() {
    }

    public UserEntity(UUID id, String name, String email, String password, String photoUrl, String bio,
            String personalLink) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.photoUrl = photoUrl;
        this.bio = bio;
        this.personalLink = personalLink;
    }

}
