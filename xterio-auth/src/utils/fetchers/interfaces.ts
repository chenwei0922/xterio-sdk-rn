export interface IResponse<T> {
  data: T
  err_code: number
  err_msg?: string
}

export interface IQueryResult<T> {
  query_id: string
  results?: T[]
}
