package com.matheusarjc.postandcomments.models.user.services;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.matheusarjc.postandcomments.models.user.UserEntity;
import com.matheusarjc.postandcomments.models.user.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    public List<UserEntity> findAllUsers() {
        return userRepository.findAll(); // Busca todos os usuarios na tabela
    }

    public Optional<UserEntity> findUserById(UUID id) {
        return userRepository.findById(id); // Retorna um usuario por ID, se existir
    }

    public UserEntity saveUser(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

}
