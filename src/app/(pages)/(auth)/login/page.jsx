export default function Login() {
    return (
        <form action="/auth/signin" method="post">

            <label htmlFor="email">Email</label>
            <input name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            
            <button>Sign In</button>

            <button formAction="/auth/signup">Sign Up</button>
            <button formAction="/auth/signout">Sign Out</button>
        </form>
    )
}