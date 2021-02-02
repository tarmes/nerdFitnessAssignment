import en1 from './en1.json';

const rounds = en1.rounds

let teams = []

// FILL TEAMS ARRAY WITH ALL UNIQUE TEAM NAMES

const getTeams = rounds.forEach(function(round){
   round.matches.forEach(function(match){
      if (teams.includes(match.team1) == false) {
         teams.push(match.team1)
      }
      if (teams.includes(match.team2) == false) {
         teams.push(match.team2)
      }
   })
})

let sorted = []

// ITERATE OVER TEAMS ARRAY, GATHERING ALL RELATIVE INFORMATION FOR EACH TEAM

var i
for (i = 0; i < teams.length; i++) {
   
   let teamData: {[k: string]: any} = {}

   let teamTotal = 0
   let opponentTotal = 0
   let wins = 0
   let losses = 0
   let draws = 0
   
   const getScores = rounds.forEach(function(round){
      round.matches.forEach(function(match){
         // CALCULATE GOALSSCORED & GOALS ALLOWED
         if (match.team1 == teams[i]) {
            teamTotal += match.score.ft[0]
            opponentTotal += match.score.ft[1]
            // CALCULATE WINS/LOSSES/DRAWS
            if (teamTotal > opponentTotal) {
               wins += 1
            }
            else if (teamTotal < opponentTotal) {
               losses += 1
            }
            else {
               draws += 1
            }
         }
         // CALCULATE GOALSSCORED & GOALS ALLOWED
         if (match.team2 == teams[i]) {
            teamTotal += match.score.ft[1]
            opponentTotal += match.score.ft[0]
            // CALCULATE WINS/LOSSES/DRAWS
            if (teamTotal > opponentTotal) {
               wins += 1
            }
            else if (teamTotal < opponentTotal) {
               losses += 1
            }
            else {
               draws += 1
            }
         }
      })
   })
   // CALCULATE POINTS
   let points = wins * 3 + draws
   // ADD PROPERTIES TO TEAM OBJECT
   teamData.name = teams[i]
   teamData.points = points
   teamData.wins = wins
   teamData.losses = losses
   teamData.draws = draws
   teamData.goalsScored = teamTotal
   teamData.goalsAllowed = opponentTotal
   teamData.goalDifferential = teamTotal - opponentTotal
   // ADD TEAM OBJECT TO FUTURE SORTED ARRAY
   sorted.push(teamData)
}

function compare( a, b ) {
   // SORT BY POINTS
   if ( a.points < b.points ) {
      return 1
   }
   if ( a.points > b.points ) {
      return -1
   }
   if ( a.points == b.points ) {
      // SORT BY GOALDIFFERENTIAL
      if ( a.goalDifferential < b.goalDifferential ) {
         return 1
      }
      if ( a.goalDifferential > b.goalDifferential) {
         return -1
      }
      if ( a.goalDifferential == b.goalDifferential ) {
         // SORT BY GOALSSCORED
         if ( a.goalsScored < b.goalsScored ) {
            return 1
         }
         if ( a.goalsScored > b.goalsScored ) {
            return -1
         }
         return 0
      }
   }
}

sorted.sort(compare)

// ADD RANK
var i
for (i = 0; i < sorted.length; i++) {
   let rank = i + 1
   sorted[i] = { 'rank': rank, ...sorted[i]}
}

console.log(sorted)