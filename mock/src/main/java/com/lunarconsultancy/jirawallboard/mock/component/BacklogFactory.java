package com.lunarconsultancy.jirawallboard.mock.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunarconsultancy.jirawallboard.mock.model.IssueResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Component
public class BacklogFactory {

    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private ObjectMapper objectMapper;

    private IssueResponse backlog;

    @PostConstruct
    public void init() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:json/backlog.json");
        backlog = objectMapper.readValue(resource.getURL(), IssueResponse.class);
    }

    public IssueResponse getBacklog() {
        return backlog;
    }
}
