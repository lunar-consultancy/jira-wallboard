package com.lunarconsultancy.jirawallboard.mock.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunarconsultancy.jirawallboard.mock.model.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Component
public class ConfigurationFactory {

    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private ObjectMapper objectMapper;

    private Configuration configuration;

    @PostConstruct
    public void init() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:json/configuration.json");
        configuration = objectMapper.readValue(resource.getURL(), Configuration.class);
    }

    public Configuration getConfiguration() {
        return configuration;
    }
}
