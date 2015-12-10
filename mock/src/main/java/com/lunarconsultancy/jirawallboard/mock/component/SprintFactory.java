package com.lunarconsultancy.jirawallboard.mock.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunarconsultancy.jirawallboard.mock.model.Sprint;
import com.lunarconsultancy.jirawallboard.mock.model.SprintResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import static java.time.temporal.TemporalAdjusters.previous;

@Component
public class SprintFactory {

    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private ObjectMapper objectMapper;

    private SprintResponse allSprints;

    @PostConstruct
    public void init() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:json/all_sprints.json");
        allSprints = objectMapper.readValue(resource.getURL(), SprintResponse.class);
    }

    public SprintResponse getAllSprints(Integer boardId) {
        updateDates();
        allSprints.getValues().forEach(s -> s.setOriginBoardId(boardId));
        return allSprints;
    }

    public Sprint getSprint(final Integer sprintId) {
        Optional<Sprint> sprint = allSprints.getValues().stream().filter(s -> s.getId().equals(sprintId)).findFirst();
        if (sprint.isPresent()){
            return sprint.get();
        }
        return null;
    }

    private void updateDates() {
        ZonedDateTime startDate;
        if (DayOfWeek.MONDAY.equals(ZonedDateTime.now().getDayOfWeek())) {
            startDate = ZonedDateTime.now().minusWeeks(1);
        } else {
            startDate = ZonedDateTime.now().with(previous(DayOfWeek.MONDAY)).minusWeeks(1);
        }
        ZonedDateTime endDate = startDate.plusWeeks(2);

        allSprints.getValues().stream()
                .filter(s -> s.getState().equals("active"))
                .forEach(s -> {
                    s.setStartDate(startDate);
                    s.setEndDate(endDate);
                });


        AtomicInteger index = new AtomicInteger();
        index.set((int) allSprints.getValues().stream()
                .filter(s -> s.getState().equals("closed"))
                .count());

        allSprints.getValues().stream()
                .filter(s -> s.getState().equals("closed"))
                .sorted((s1, s2) -> ((Integer) s1.getId()).compareTo((Integer) s2.getId()))
                .forEach(s -> {
                    int i = index.getAndDecrement() * 2;
                    s.setStartDate(startDate.minusWeeks(i));
                    s.setEndDate(endDate.minusWeeks(i));
                    s.setCompleteDate(endDate.minusWeeks(i));
                });

    }
}
