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

    public UserEntity() {
    }

    public UserEntity(UUID id, String name, String username, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UUID getUuid() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
