"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var en1_json_1 = __importDefault(require("./en1.json"));
var rounds = en1_json_1["default"].rounds;
var teams = [];
var getTeams = rounds.forEach(function (round) {
    round.matches.forEach(function (match) {
        if (teams.includes(match.team1) == false) {
            teams.push(match.team1);
        }
        if (teams.includes(match.team2) == false) {
            teams.push(match.team2);
        }
    });
});
var sorted = [];
var i;
var _loop_1 = function () {
    var teamData = {};
    var teamTotal = 0;
    var opponentTotal = 0;
    var wins = 0;
    var losses = 0;
    var draws = 0;
    var getScores = rounds.forEach(function (round) {
        round.matches.forEach(function (match) {
            if (match.team1 == teams[i]) {
                teamTotal += match.score.ft[0];
                opponentTotal += match.score.ft[1];
                if (teamTotal > opponentTotal) {
                    wins += 1;
                }
                else if (teamTotal < opponentTotal) {
                    losses += 1;
                }
                else {
                    draws += 1;
                }
            }
            if (match.team2 == teams[i]) {
                teamTotal += match.score.ft[1];
                opponentTotal += match.score.ft[0];
                if (teamTotal > opponentTotal) {
                    wins += 1;
                }
                else if (teamTotal < opponentTotal) {
                    losses += 1;
                }
                else {
                    draws += 1;
                }
            }
        });
    });
    var points = wins * 3 + draws;
    teamData.name = teams[i];
    teamData.points = points;
    teamData.wins = wins;
    teamData.losses = losses;
    teamData.draws = draws;
    teamData.goalsScored = teamTotal;
    teamData.goalsAllowed = opponentTotal;
    teamData.goalDifferential = teamTotal - opponentTotal;
    sorted.push(teamData);
};
for (i = 0; i < teams.length; i++) {
    _loop_1();
}
function compare(a, b) {
    if (a.points < b.points) {
        return 1;
    }
    if (a.points > b.points) {
        return -1;
    }
    if (a.points == b.points) {
        if (a.goalDifferential < b.goalDifferential) {
            return 1;
        }
        if (a.goalDifferential > b.goalDifferential) {
            return -1;
        }
        if (a.goalDifferential == b.goalDifferential) {
            if (a.goalsScored < b.goalsScored) {
                return 1;
            }
            if (a.goalsScored > b.goalsScored) {
                return -1;
            }
            return 0;
        }
    }
}
sorted.sort(compare);
var i;
for (i = 0; i < sorted.length; i++) {
    var rank = i + 1;
    sorted[i] = __assign({ 'rank': rank }, sorted[i]);
}
console.log(sorted);
