function calculateProductivityScore({totalMinutes, habitCompletions, limitBreaches}) {
  const focusPenalty = Math.min(60, Math.round(totalMinutes / 5));
  const habitBoost = Math.min(30, habitCompletions * 4);
  const breachPenalty = Math.min(30, limitBreaches * 5);

  return Math.max(0, Math.min(100, 70 - focusPenalty + habitBoost - breachPenalty));
}

function buildRecommendations({topDistractors, score}) {
  const recommendations = [];
  if (score < 40) {
    recommendations.push('Try two 25-minute focus sessions before noon.');
  }
  if (topDistractors?.length) {
    recommendations.push(`Set tighter limit for ${topDistractors[0]}.`);
  }
  recommendations.push('Enable strict mode during your highest-risk hours.');
  return recommendations;
}

module.exports = {calculateProductivityScore, buildRecommendations};
