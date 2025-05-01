import { entries, get, set, del } from "idb-keyval"
import { TimerEntity, TimerModel } from "../models"
import { ResourceNotFoundException } from "../exceptions"
import { IMapper } from "../mapping/IMapper"
import { TimerCreateModel } from "../models/TimerCreateModel"
import { NumberUtils } from "../utils"

export interface ITimerDb {
  getTimersAsync(): Promise<TimerModel[]>

  setTimerAsync(timer: TimerModel): Promise<void>

  addTimerAsync(timer: TimerCreateModel): Promise<void>

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

  async addTimerAsync(timer: TimerCreateModel): Promise<void> {
    const id = await this.getNextIdAsync();
    await this.setTimerAsync({
      id: id.toString(),
      ...timer,
    });
  }

  public async getTimerAsync(id: string): Promise<TimerModel> {
    const entity = await get<TimerEntity>(id)
    ResourceNotFoundException.ThrowIfNullOrUndefined(entity)
    return this.mapper.MapBackwards(entity!)
  }

  public async deleteTimerAsync(id: string): Promise<void> {
    await del(id)
  }

  private async getMaxIdAsync(): Promise<number> {
    const timers = await this.getTimersAsync()
    const numericIds = timers
      .map(t => t.id)
      .filter(NumberUtils.isNumber)
      .map(id => Number.parseInt(id))
    return Math.max(0,...numericIds)
  }

  private async getNextIdAsync(): Promise<number> {
    const lastId = await this.getMaxIdAsync()
    return lastId + 1
  }
}
