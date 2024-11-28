/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Face Up Task API
 * API documentation for Face Up Task
 * OpenAPI spec version: 1.0.0
 */
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { customInstance } from '../../lib/axios';
import type { GetApiInstitutionsId404, Institution } from '.././model';

/**
 * @summary Get all institutions
 */
export const getApiInstitutions = (signal?: AbortSignal) => {
  return customInstance<Institution[]>({
    url: `/api/institutions`,
    method: 'GET',
    signal,
  });
};

export const getGetApiInstitutionsQueryKey = () => {
  return [`/api/institutions`] as const;
};

export const getGetApiInstitutionsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiInstitutions>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiInstitutions>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiInstitutionsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiInstitutions>>
  > = ({ signal }) => getApiInstitutions(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiInstitutions>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> };
};

export type GetApiInstitutionsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiInstitutions>>
>;
export type GetApiInstitutionsQueryError = void;

export function useGetApiInstitutions<
  TData = Awaited<ReturnType<typeof getApiInstitutions>>,
  TError = void,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiInstitutions>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiInstitutions>>,
        TError,
        TData
      >,
      'initialData'
    >;
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>;
};
export function useGetApiInstitutions<
  TData = Awaited<ReturnType<typeof getApiInstitutions>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiInstitutions>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiInstitutions>>,
        TError,
        TData
      >,
      'initialData'
    >;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
export function useGetApiInstitutions<
  TData = Awaited<ReturnType<typeof getApiInstitutions>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiInstitutions>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
/**
 * @summary Get all institutions
 */

export function useGetApiInstitutions<
  TData = Awaited<ReturnType<typeof getApiInstitutions>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiInstitutions>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiInstitutionsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get institution by ID
 */
export const getApiInstitutionsId = (id: string, signal?: AbortSignal) => {
  return customInstance<Institution>({
    url: `/api/institutions/${id}`,
    method: 'GET',
    signal,
  });
};

export const getGetApiInstitutionsIdQueryKey = (id: string) => {
  return [`/api/institutions/${id}`] as const;
};

export const getGetApiInstitutionsIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiInstitutionsId>>,
  TError = GetApiInstitutionsId404 | void,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiInstitutionsId>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiInstitutionsIdQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiInstitutionsId>>
  > = ({ signal }) => getApiInstitutionsId(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiInstitutionsId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> };
};

export type GetApiInstitutionsIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiInstitutionsId>>
>;
export type GetApiInstitutionsIdQueryError = GetApiInstitutionsId404 | void;

export function useGetApiInstitutionsId<
  TData = Awaited<ReturnType<typeof getApiInstitutionsId>>,
  TError = GetApiInstitutionsId404 | void,
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiInstitutionsId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiInstitutionsId>>,
          TError,
          TData
        >,
        'initialData'
      >;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>;
};
export function useGetApiInstitutionsId<
  TData = Awaited<ReturnType<typeof getApiInstitutionsId>>,
  TError = GetApiInstitutionsId404 | void,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiInstitutionsId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiInstitutionsId>>,
          TError,
          TData
        >,
        'initialData'
      >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
export function useGetApiInstitutionsId<
  TData = Awaited<ReturnType<typeof getApiInstitutionsId>>,
  TError = GetApiInstitutionsId404 | void,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiInstitutionsId>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
/**
 * @summary Get institution by ID
 */

export function useGetApiInstitutionsId<
  TData = Awaited<ReturnType<typeof getApiInstitutionsId>>,
  TError = GetApiInstitutionsId404 | void,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiInstitutionsId>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiInstitutionsIdQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
