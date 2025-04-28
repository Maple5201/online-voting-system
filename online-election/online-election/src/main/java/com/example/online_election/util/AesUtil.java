package com.example.online_election.util;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class AesUtil {

    @Value("${aes.secret}")
    private String secretKey;

    @Value("${aes.iv}")
    private String initVector;

    private IvParameterSpec ivSpec;
    private SecretKeySpec secretKeySpec;

    @PostConstruct
    public void init() {
        ivSpec = new IvParameterSpec(initVector.getBytes());
        secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
    }

    public String encrypt(String value) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivSpec);
            byte[] encrypted = cipher.doFinal(value.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception ex) {
            throw new RuntimeException("Encryption error: " + ex.getMessage());
        }
    }

    public String decrypt(String encrypted) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivSpec);
            byte[] original = cipher.doFinal(Base64.getDecoder().decode(encrypted));
            return new String(original);
        } catch (Exception ex) {
            throw new RuntimeException("Decryption error: " + ex.getMessage());
        }
    }
}

