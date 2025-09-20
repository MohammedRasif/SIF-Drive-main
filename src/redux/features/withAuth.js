import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { use } from "react";

export const sqQuery = createApi({
  reducerPath: "sqQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.60:8000/api",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("ngrok-skip-browser-warning", "true");

      // Include token for all requests if available, letting the server handle authentication
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // The server should return public data without a token and enriched data with a token

      return headers;
    },
  }),

  tagTypes: [
    "profileInfo",
    "earnings",  
  ],
  endpoints: (builder) => ({
    // newPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/change-password/",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["UserProfile"],
    // }),
    showProfileInformation: builder.query({
      query: () => "/accounts/web/profile/company/",
      providesTags: ["profileInfo"],
    }),

    // show dashboard total earnings
    showUserEarnings: builder.query({
      query: () => "/accounts/web/dashboard/",
      providesTags: ["earnings"],
    }),

    //show dashbaord earnings chart data
    showRarningChartData:builder.query({
      query:()=>"/accounts/web/dashboard/monthly-earnings/",
      providesTags: ["earnings"],
    }),

    // show dashbaord recent transactions data 
    showReactTransactions:builder.query({
      query:()=>"/accounts/web/dashboard/recent-transactions/",
      providesTags: ["earnings"],
    }),
   

  }),
});

export const {
  useShowProfileInformationQuery,
  useShowUserEarningsQuery,
  useShowRarningChartDataQuery,
  useShowReactTransactionsQuery,
} = sqQuery;
