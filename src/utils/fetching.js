import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const { publicRuntimeConfig } = getConfig();

const defaultApiUrl = publicRuntimeConfig.apiUrl;

export const withApiData = (
  getServerSideProps = () => {},
  { apiUrl, route: rawRoute, formatter, prop = "apiData", config = {} }
) => {
  return async (context) => {
    const originalProps = (await getServerSideProps(context)) || { props: {} };
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    // Allow users to grab data from context and props to determine url to fetch from
    const route =
      typeof rawRoute === "string"
        ? rawRoute
        : rawRoute({
            ...context,
            props: {
              ...context?.props,
              ...originalProps?.props,
            },
          });
    let apiData = {
      data: {},
      error: {},
    };

    if (route) {
      apiData = await doApiRequest({
        apiUrl,
        route,
        formatter,
        // Looks quite hacky, and it is. But we have to do request on behalf of
        // user, so we forward credentials
        config: session
          ? {
              ...config,
              headers: {
                ...config?.headers,
                Authorization: `Bearer ${session?.accessToken}`,
              },
            }
          : { ...config },
      });
    }

    return {
      ...originalProps,
      props: {
        // If we don't know, assume it worked
        statusCode: Math.max(
          apiData?.status || 200,
          originalProps?.props?.statusCode || 200
        ),
        ...originalProps.props,
        [prop]: apiData,
      },
    };
  };
};

export const doApiRequest = async ({
  method = "get",
  apiUrl = defaultApiUrl,
  route,
  formatter = (data) => data,
  config = {},
  data: requestData,
}) => {
  let data = {};
  let error = {};
  let status = 200;
  const requestConfig = {
    timeout: 5000,
    ...config,
  };

  try {
    const response = await axios({
      method,
      url: `${apiUrl}/${route}`,
      ...requestConfig,
      data: requestData,
    });
    data = formatter(response.data);
  } catch ({ response }) {
    status = response?.status || null;
    error = {
      ...(response?.data || {}),
    };
    console.error(error);
  }

  return {
    data,
    error,
    status,
  };
};

export const useApiData = ({
  apiUrl = defaultApiUrl,
  route,
  formatter = (data) => data,
  config = {},
}) => {
  const [fetching, setFetching] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState(200);

  useEffect(() => {
    const requestConfig = {
      timeout: 5000,
      ...config,
    };
    const fetchData = async () => {
      setFetching(true);

      try {
        const response = await axios({
          method: "get",
          url: `${apiUrl}/${route}`,
          ...requestConfig,
        });
        const { data } = response;
        setData(formatter(data));
        setFetching(false);
      } catch ({ response }) {
        setStatus(response.status);
        setError({
          ...(response?.data || {}),
        });
        setFetching(false);
        console.error(error);
      }
    };
    if (!data && !fetching && !error) {
      fetchData();
    }
  }, [route, apiUrl, formatter, data, fetching, error, config]);

  return {
    data,
    error,
    status,
  };
};

export const STATUS_CODE_DESCRIPTIONS = {
  400: {
    title: "Something broke while fetching data",
    details: "Please reach out to an admin",
  },
  403: {
    title: "Permission error while fetching data",
    details: "Please reach out to an admin",
  },
  404: {
    title: "Page not found",
    details:
      "Please re-check url used. If you came here from a link, let us know",
  },
  500: {
    title: "Something in our frontend broke",
    details: "Please reach out to an admin",
  },
  503: {
    title: "Unable to get reach backend",
    details: "We are probably working on something, please give us a minute",
  },
};
