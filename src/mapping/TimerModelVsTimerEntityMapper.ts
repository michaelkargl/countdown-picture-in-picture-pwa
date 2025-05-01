import { DateTime } from "luxon"
import { TimerEntity, TimerModel } from "../models"
import { IMapper } from "./IMapper"

export class TimerModelVsTimerEntityMapper
  implements IMapper<TimerModel, TimerEntity>
{
  public MapBackwards(entity: TimerEntity): TimerModel {
    return {
      ...entity,
      startTime: DateTime.fromISO(entity.startTime),
      endTime: DateTime.fromISO(entity.endTime)
    };
  }

  public MapForwards(model: TimerModel): TimerEntity {
    return {
      ...model,
      startTime: model.startTime.toISO()!,
      endTime: model.endTime.toISO()!
    }
  }
}