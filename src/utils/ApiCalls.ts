import type { QueryParamter } from "@/types/api/QueryParameter";


export function queryParameters(...args: Array<QueryParamter>[]) {
    let parameters = args.reduce(
        (subListParameters: string, subList: QueryParamter[]) => {
            return subListParameters + subList.reduce(
                (paramters: string, parameter: QueryParamter) => {
                    return paramters += parameter.name + "=" + parameter.value + "&"
                }, ""
            )
        }
        , ""
    )

    return parameters.slice(0, -1) // Removing last "&" from paramters
}