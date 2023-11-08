import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth({
    onError(req, res, error) {
    //   errorLogger(error);
      // You can finish the response yourself if you want to customize
      // the status code or redirect the user
      res.writeHead(302, {
          Location: '/error'
      });
      res.end();
    }
  });