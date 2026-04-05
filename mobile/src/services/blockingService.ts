import type {BlockRule, UsageSnapshot} from '@/types';

export interface BlockingDecision {
  blocked: boolean;
  reason: string;
  mode: 'strict' | 'flexible' | 'none';
}

const inSchedule = (rule: BlockRule, now: Date) => {
  const day = now.getDay();
  if (!rule.schedule.days.includes(day)) {
    return false;
  }
  const minutes = now.getHours() * 60 + now.getMinutes();
  const [startH, startM] = rule.schedule.start.split(':').map(Number);
  const [endH, endM] = rule.schedule.end.split(':').map(Number);
  const start = startH * 60 + startM;
  const end = endH * 60 + endM;
  return minutes >= start && minutes <= end;
};

export const evaluateBlock = (
  targetId: string,
  rules: BlockRule[],
  usage: UsageSnapshot,
  now = new Date()
): BlockingDecision => {
  const rule = rules.find(item => item.targetId === targetId);
  if (!rule) {
    return {blocked: false, reason: 'No rule configured', mode: 'none'};
  }

  if (!inSchedule(rule, now)) {
    return {blocked: false, reason: 'Outside scheduled block window', mode: 'none'};
  }

  const usedMinutes =
    rule.targetType === 'app'
      ? usage.apps.find(app => app.packageName === targetId)?.minutes ?? 0
      : usage.websites.find(site => site.domain === targetId)?.minutes ?? 0;

  if (usedMinutes < rule.dailyLimitMinutes) {
    return {
      blocked: false,
      reason: `Limit not reached (${usedMinutes}/${rule.dailyLimitMinutes})`,
      mode: 'none'
    };
  }

  return {
    blocked: true,
    reason: `Limit exceeded (${usedMinutes}/${rule.dailyLimitMinutes})`,
    mode: rule.mode
  };
};
