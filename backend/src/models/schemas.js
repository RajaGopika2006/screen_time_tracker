const {z} = require('zod');

const usageSchema = z.object({
  userId: z.string(),
  date: z.string(),
  totalMinutes: z.number().nonnegative(),
  apps: z.array(
    z.object({
      packageName: z.string(),
      minutes: z.number().nonnegative()
    })
  ),
  websites: z.array(
    z.object({
      domain: z.string(),
      minutes: z.number().nonnegative()
    })
  )
});

const habitSchema = z.object({
  userId: z.string(),
  title: z.string().min(2),
  reminderTime: z.string().optional()
});

module.exports = {usageSchema, habitSchema};
