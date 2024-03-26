export function NullBodyRequest(request:Request){
   return request?.body ? true :false
}