import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      if (token.error) {
        console.log(token.error);
      }
      return (
        !!token &&
        !token.error &&
        (!token.accessTokenExpires || Date.now() < token.accessTokenExpires)
      );
    },
  },
});
