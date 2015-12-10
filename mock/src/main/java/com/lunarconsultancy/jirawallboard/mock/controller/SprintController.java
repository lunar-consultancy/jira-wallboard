package com.lunarconsultancy.jirawallboard.mock.controller;

import com.lunarconsultancy.jirawallboard.mock.component.IssueFactory;
import com.lunarconsultancy.jirawallboard.mock.model.IssueResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/rest/agile/1.0/sprint")
@CrossOrigin
public class SprintController {

    private static final int MAX_RESULT = 50;

    @Autowired
    private IssueFactory issueFactory;

    @RequestMapping(path = "/{sprintId}/issue", method = RequestMethod.GET)
    public IssueResponse getIssuesForSprint(final @PathVariable Integer sprintId,
                                            final @RequestParam(value = "startAt", required = false) Integer startAt,
                                            final @RequestParam(value = "maxResults", required = false) Integer maxResults) throws IOException {

        Integer s = startAt == null ? 0 : startAt;
        Integer m = maxResults == null ? MAX_RESULT : maxResults;

        IssueResponse issueResponse = issueFactory.getIssuesForSprint(sprintId);
        issueResponse.setTotal(issueResponse.getIssues().size());
        issueResponse.setStartAt(s);
        issueResponse.setMaxResults(m);
        issueResponse.setIssues(issueResponse.getIssues().stream()
                .sorted()
                .skip(s)
                .limit(m)
                .collect(toList()));
        return issueResponse;
    }

}
