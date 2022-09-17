import Dexie, { Table } from "dexie";

export interface habit {
  id?: number;

  // Info
  title: string;
  color: string;
  frequency: number;
  activeReminder: boolean;
  reminderTime: string;
  reminderTitle: string;

  //
  archive: boolean;
  startedAt: Date;
  endAt?: Date;
  checkedList: string[];
}

export class HabitsDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  habits!: Table<habit>;

  constructor() {
    super("habits");
    this.version(1).stores({
      habits: "++id, asyncId", // Primary key and indexed props
    });
  }

  //
  async toggleHabitCheck(id: number, stringDate: string) {
    // Get habit from database
    const habit = await this.habits.get(id);

    //
    if (habit) {
      const isHabitChecked = habit.checkedList.includes(stringDate);
      if (isHabitChecked) {
        // Get index of day from done list
        const index = habit.checkedList.indexOf(stringDate);

        // Remove date from done list
        habit.checkedList.splice(index, 1);
      } else {
        // When date not in list just add it to check
        habit.checkedList.push(stringDate);
      }

      // Sort checked List
      habit.checkedList.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });

      // Update habit in database
      return await this.habits.put(habit);
    }
  }
}

export const db = new HabitsDexie();
