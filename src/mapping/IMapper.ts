export interface IMapper<TFrom, TTo> {
  MapForwards(from: TFrom): TTo;

  MapBackwards(to: TTo): TFrom;
}