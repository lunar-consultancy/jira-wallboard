package com.lunarconsultancy.jirawallboard.mock.controller;

import com.lunarconsultancy.jirawallboard.mock.component.BacklogFactory;
import com.lunarconsultancy.jirawallboard.mock.component.BoardFactory;
import com.lunarconsultancy.jirawallboard.mock.component.ConfigurationFactory;
import com.lunarconsultancy.jirawallboard.mock.component.SprintFactory;
import com.lunarconsultancy.jirawallboard.mock.model.BoardResponse;
import com.lunarconsultancy.jirawallboard.mock.model.Configuration;
import com.lunarconsultancy.jirawallboard.mock.model.IssueResponse;
import com.lunarconsultancy.jirawallboard.mock.model.SprintResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/agile/1.0/board")
@CrossOrigin
public class BoardController {

    @Autowired
    private BacklogFactory backlogFactory;
    @Autowired
    private BoardFactory boardFactory;
    @Autowired
    private ConfigurationFactory configurationFactory;
    @Autowired
    private SprintFactory sprintFactory;

    @RequestMapping(path = "", method = RequestMethod.GET)
    public BoardResponse getAllBoards(@RequestParam(value = "name", required = false) String name) {
        if (StringUtils.isEmpty(name)) {
            return boardFactory.getAllBoards();
        }
        return boardFactory.getBoard(name);
    }

    @RequestMapping(path = "/{boardId}/backlog", method = RequestMethod.GET)
    public IssueResponse getBacklog() {
        return backlogFactory.getBacklog();
    }

    @RequestMapping(path = "/{boardId}/configuration", method = RequestMethod.GET)
    public Configuration getConfiguration() {
        return configurationFactory.getConfiguration();
    }

    @RequestMapping(path = "/{boardId}/sprint", method = RequestMethod.GET)
    public SprintResponse getAllSprints(@PathVariable Integer boardId) {
        return sprintFactory.getAllSprints(boardId);
    }

}
