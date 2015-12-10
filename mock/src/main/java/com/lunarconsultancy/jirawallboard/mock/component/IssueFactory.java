package com.lunarconsultancy.jirawallboard.mock.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunarconsultancy.jirawallboard.mock.model.IssueResponse;
import com.lunarconsultancy.jirawallboard.mock.model.Sprint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static java.lang.String.format;

@Component
public class IssueFactory {

    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SprintFactory sprintFactory;

    public IssueResponse getIssuesForSprint(final Integer sprintId) throws IOException {
        Resource resource = resourceLoader.getResource(format("classpath:json/issues_for_sprint_%d.json", sprintId));
        IssueResponse issueResponse = objectMapper.readValue(resource.getURL(), IssueResponse.class);
        Sprint sprint = sprintFactory.getSprint(sprintId);
        issueResponse.getIssues().forEach(i -> i.getFields().setSprint(sprint));
        return issueResponse;
    }
}
