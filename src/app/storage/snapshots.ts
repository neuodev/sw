import dayjs, { Dayjs } from "dayjs";
import localforage from "localforage";

const lfSnapshots = localforage.createInstance({
  name: "sw",
  storeName: "snapshots",
});

class SnapshotsDB {
  lf: LocalForage;
  constructor() {
    this.lf = lfSnapshots;
  }

  async save(day: Dayjs, snapshots: Dayjs[]): Promise<void> {
    await this.lf.setItem(
      this.asKey(day),
      snapshots.map((s) => s.toString())
    );
  }

  async load(day: Dayjs): Promise<Dayjs[] | null> {
    const snapshots = await this.lf.getItem<string[]>(this.asKey(day));
    if (!snapshots) return null;
    return snapshots.map((snapshot) => dayjs(snapshot));
  }

  async clean(day: Dayjs): Promise<void> {
    await this.lf.removeItem(this.asKey(day));
  }

  private asKey(day: Dayjs): string {
    return day.format("YYYY-MM-DD");
  }
}

export const snapshotsDB = new SnapshotsDB();
