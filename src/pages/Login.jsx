import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <section>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="submit">Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
