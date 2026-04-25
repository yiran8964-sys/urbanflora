package com.web3.herstory.urbanflora.controller;

import com.web3.herstory.urbanflora.handler.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Value("${app.upload-dir}")
    private String uploadDir;

    @PostMapping
    public Result<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        File dir = Path.of(uploadDir).toAbsolutePath().normalize().toFile();
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        File dest = new File(dir, fileName);

        System.out.println("保存路径: " + dest.getAbsolutePath());

        file.transferTo(dest);

        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(fileName)
                .toUriString();

        return Result.success(fileUrl);
    }
}
