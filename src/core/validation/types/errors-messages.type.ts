export type ErrorMessageType = {
  field: string;
  message: string;
};

/*Тип для формата ошибок, возвращаемых клиенту при валидации входных данных.*/
export type ErrorsMessagesType = ErrorMessageType[];
