import { set, entries, get } from "idb-keyval"
import { TimerEntity, TimerModel } from "../models"
import { ResourceNotFoundException } from "../exceptions"
import { IMapper } from "../mapping/IMapper"

export class TimerDB {
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

  public async getTimerAsync(id: string): Promise<TimerModel> {
    const entity = await get<TimerModel>(id);
    ResourceNotFoundException.ThrowIfNullOrUndefined(entity)
    return this.mapper.MapBackwards(entity!);
  }
}
