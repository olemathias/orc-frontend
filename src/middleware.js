import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      if (token?.error) {
        console.log(token?.error);
      }
      return (
        !!token &&
        token?.error !== "refresh access token" &&
        (!token?.accessTokenExpires ||
          Date.now() < token?.accessTokenExpires + 10000)
      );
    },
  },
});
