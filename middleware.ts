

// export default function middleware(req, res, next) {
//     const session = getSession({ req })

//     if (!session) {
//         return res.redirect('/login')
//     }

//     return next()
// }
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});