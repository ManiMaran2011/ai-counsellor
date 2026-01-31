// app/lib/db.ts

export const db = {
  task: {
    findMany: async () => [],
    create: async (data: any) => data,
    update: async (data: any) => data,
  },
  lock: {
    create: async (data: any) => data,
  },
};
