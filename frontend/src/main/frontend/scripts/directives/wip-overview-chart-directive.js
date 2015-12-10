'use strict';

/**
 * @ngdoc directive
 * @name wipOverviewChart
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('wipOverviewChart', ['$filter', 'moment', function ($filter, moment) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="wip-overview-chart">' +
            '  <div class="header">Burn-down</div>' +
            '  <div class="content">' +
            '    <canvas id="line" class="chart chart-line" chart-data="data" chart-labels="labels"' +
            '      chart-legend="true" chart-series="series" chart-options="options" chart-colours="colours"></canvas>' +
            '  </div>' +
            '</div>',
            link: function ($scope) {

                $scope.$watch('issues', function () {
                    if ($scope.activeSprint !== undefined) {
                        var startDate = moment($scope.activeSprint.startDate).startOf('day');
                        var endDate = moment($scope.activeSprint.endDate).startOf('day');
                        var diff = endDate.diff(startDate, 'days');

                        $scope.labels = [];
                        var d = startDate.clone();
                        for (var i = 0; i <= diff; i++) {
                            $scope.labels.push('', d.format('MMM D ddd'));
                            d = d.add(1, 'days');
                        }

                        $scope.data = [
                            getGuideline(startDate, endDate, diff),
                            getRemaining(startDate)
                        ];
                    }
                });

                var getGuideline = function (startDate, endDate, diff) {

                    var workdays = endDate.businessDiff(startDate);
                    var day = startDate.clone().add(1, 'days');
                    var decrease = $scope.pointsTotal / (workdays * 2);
                    var points = $scope.pointsTotal;

                    var guideline = [points, points, points];
                    for (var i = 1; i <= diff; i++) {
                        if (i === diff) {
                            guideline.push(0);
                        } else if (day.day() === 0 || day.day() === 6) {
                            guideline.push(points, points);
                        } else {
                            points -= decrease;
                            guideline.push(points, points - decrease);
                            points -= decrease;
                        }
                        day = day.add(1, 'days');
                    }

                    return guideline;
                };

                var getRemaining = function (startDate) {

                    var diff = moment().diff(startDate, 'days');
                    var now = moment().startOf('day');
                    var day = startDate.clone();
                    var points = $scope.pointsTotal;
                    var stories = $filter('stories')($scope.issues);

                    var remaining = [points];
                    for (var i = 0; i <= diff; i++) {

                        for (var s = 0; s < stories.length; s++) {
                            var story = stories[s];
                            if (story.fields.resolutiondate !== undefined &&
                                moment(story.fields.resolutiondate).startOf('day').isSame(day)) {
                                points -= story.fields[$scope.estimationFieldId];
                            }
                        }
                        remaining.push(points);
                        if (!now.isSame(day)) {
                            remaining.push(points);
                        }
                        day = day.add(1, 'days');
                    }

                    return remaining;
                };

                $scope.series = ['Guideline', 'Remaining'];
                $scope.options = {
                    scaleShowGridLines: true,
                    scaleGridLineColor: "rgba(255,255,255,.1)",
                    bezierCurve: false,
                    pointDot: false,
                    showTooltips: false,
                    scaleShowVerticalLines: false
                };
                $scope.colours = ['#4a6785', '#14892c'];
            }
        };
    }]);
