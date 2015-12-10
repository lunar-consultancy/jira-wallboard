package com.lunarconsultancy.jirawallboard.mock.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Collection;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class Fields {

    private IssueType issuetype;
    private Integer timespent;
    private Integer aggregatetimespent;
    private Resolution resolution;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime resolutiondate;
    private Integer workratio;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime lastViewed;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime created;
    private Priority priority;
    private Collection<String> labels;
    private Integer timeestimate;
    private Integer aggregatetimeoriginalestimate;
    private Collection<Version> versions;
    private Collection<Issue> issuelinks;
    private Assignee assignee;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime updated;
    private Status status;
    private Collection<String> components;
    private Integer timeoriginalestimate;
    private String description;
    private Collection<Attachment> attachment;
    private Integer aggregatetimeestimate;
    private Boolean flagged;
    private String summary;
    private Collection<SubTask> subtasks;
    private String environment;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate duedate;
    private Progress aggregateprogress;
    private Progress progress;
    private Epic epic;
    private Boolean done;
    private Integer customfield_10043;
    private Sprint sprint;

    public Progress getAggregateprogress() {
        return aggregateprogress;
    }

    public void setAggregateprogress(Progress aggregateprogress) {
        this.aggregateprogress = aggregateprogress;
    }

    public Integer getAggregatetimeestimate() {
        return aggregatetimeestimate;
    }

    public void setAggregatetimeestimate(Integer aggregatetimeestimate) {
        this.aggregatetimeestimate = aggregatetimeestimate;
    }

    public Integer getAggregatetimeoriginalestimate() {
        return aggregatetimeoriginalestimate;
    }

    public void setAggregatetimeoriginalestimate(Integer aggregatetimeoriginalestimate) {
        this.aggregatetimeoriginalestimate = aggregatetimeoriginalestimate;
    }

    public Integer getAggregatetimespent() {
        return aggregatetimespent;
    }

    public void setAggregatetimespent(Integer aggregatetimespent) {
        this.aggregatetimespent = aggregatetimespent;
    }

    public Assignee getAssignee() {
        return assignee;
    }

    public void setAssignee(Assignee assignee) {
        this.assignee = assignee;
    }

    public Collection<Attachment> getAttachment() {
        return attachment;
    }

    public void setAttachment(Collection<Attachment> attachment) {
        this.attachment = attachment;
    }

    public Collection<String> getComponents() {
        return components;
    }

    public void setComponents(Collection<String> components) {
        this.components = components;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public LocalDate getDuedate() {
        return duedate;
    }

    public void setDuedate(LocalDate duedate) {
        this.duedate = duedate;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public Epic getEpic() {
        return epic;
    }

    public void setEpic(Epic epic) {
        this.epic = epic;
    }

    public Boolean getFlagged() {
        return flagged;
    }

    public void setFlagged(Boolean flagged) {
        this.flagged = flagged;
    }

    public Collection<Issue> getIssuelinks() {
        return issuelinks;
    }

    public void setIssuelinks(Collection<Issue> issuelinks) {
        this.issuelinks = issuelinks;
    }

    public IssueType getIssuetype() {
        return issuetype;
    }

    public void setIssuetype(IssueType issuetype) {
        this.issuetype = issuetype;
    }

    public Collection<String> getLabels() {
        return labels;
    }

    public void setLabels(Collection<String> labels) {
        this.labels = labels;
    }

    public ZonedDateTime getLastViewed() {
        return lastViewed;
    }

    public void setLastViewed(ZonedDateTime lastViewed) {
        this.lastViewed = lastViewed;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Progress getProgress() {
        return progress;
    }

    public void setProgress(Progress progress) {
        this.progress = progress;
    }

    public Resolution getResolution() {
        return resolution;
    }

    public void setResolution(Resolution resolution) {
        this.resolution = resolution;
    }

    public ZonedDateTime getResolutiondate() {
        return resolutiondate;
    }

    public void setResolutiondate(ZonedDateTime resolutiondate) {
        this.resolutiondate = resolutiondate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Collection<SubTask> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(Collection<SubTask> subtasks) {
        this.subtasks = subtasks;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getTimeestimate() {
        return timeestimate;
    }

    public void setTimeestimate(Integer timeestimate) {
        this.timeestimate = timeestimate;
    }

    public Integer getTimeoriginalestimate() {
        return timeoriginalestimate;
    }

    public void setTimeoriginalestimate(Integer timeoriginalestimate) {
        this.timeoriginalestimate = timeoriginalestimate;
    }

    public Integer getTimespent() {
        return timespent;
    }

    public void setTimespent(Integer timespent) {
        this.timespent = timespent;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(ZonedDateTime updated) {
        this.updated = updated;
    }

    public Collection<Version> getVersions() {
        return versions;
    }

    public void setVersions(Collection<Version> versions) {
        this.versions = versions;
    }

    public Integer getWorkratio() {
        return workratio;
    }

    public void setWorkratio(Integer workratio) {
        this.workratio = workratio;
    }

    public Integer getCustomfield_10043() {
        return customfield_10043;
    }

    public void setCustomfield_10043(Integer customfield_10043) {
        this.customfield_10043 = customfield_10043;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }
}
