package com.web3.herstory.urbanflora.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping({"/", "/garden", "/explore"})
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
