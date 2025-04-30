import { TimerEntity, TimerModel } from "../models"
import { IMapper } from "./IMapper"

export class TimerModelVsTimerEntityMapper
  implements IMapper<TimerModel, TimerEntity>
{
  public MapBackwards(to: TimerEntity): TimerModel {
    return to as TimerModel
  }

  public MapForwards(from: TimerModel): TimerEntity {
    return from as TimerEntity
  }
}