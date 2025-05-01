import { entries, get, set, del } from "idb-keyval"
import { TimerEntity, TimerModel } from "../models"
import { ResourceNotFoundException } from "../exceptions"
import { IMapper } from "../mapping/IMapper"

export interface ITimerDb {
  getTimersAsync(): Promise<TimerModel[]>

  setTimerAsync(timer: TimerModel): Promise<void>

  setTimersAsync(timers: TimerModel[]): Promise<void>

  getTimerAsync(id: string): Promise<TimerModel>

  deleteTimerAsync(id: string): Promise<void>
}

export class TimerDB implements ITimerDb {
  constructor(private readonly mapper: IMapper<TimerModel, TimerEntity>) {}

  public async getTimersAsync(): Promise<TimerModel[]> {
    const entityTuples = await entries<IDBValidKey, TimerEntity>()
    return entityTuples
      .map(tuple => tuple[1])
      .map(entity => this.mapper.MapBackwards(entity))
  }

  public async setTimerAsync(timer: TimerModel): Promise<void> {
    const entity = this.mapper.MapForwards(timer)
    await set(entity.id, entity)
  }

  public async setTimersAsync(timers: TimerModel[]): Promise<void> {
    await Promise.all(timers.map(t => this.setTimerAsync(t)))
  }

  public async getTimerAsync(id: string): Promise<TimerModel> {
    const entity = await get<TimerEntity>(id)
    ResourceNotFoundException.ThrowIfNullOrUndefined(entity)
    return this.mapper.MapBackwards(entity!)
  }

  public async deleteTimerAsync(id: string): Promise<void> {
    await del(id);
  }
}
