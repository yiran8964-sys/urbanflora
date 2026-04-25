package com.web3.herstory.urbanflora.controller;

import com.web3.herstory.urbanflora.handler.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/healthz")
    public Result<String> healthz() {
        return Result.success("ok");
    }
}
