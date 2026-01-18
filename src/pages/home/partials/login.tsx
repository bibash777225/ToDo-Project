import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dark Themed Login</title>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        body {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            height: 100vh;\n            background: #0b0f1a;\n            font-family: Arial, sans-serif;\n            margin: 0;\n        }\n        .container {\n            position: relative;\n            width: 350px;\n            background: rgba(255, 255, 255, 0.05);\n            border-radius: 15px;\n            padding: 20px;\n            text-align: center;\n            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n            backdrop-filter: blur(10px);\n        }\n        .container h2 {\n            color: white;\n            margin-bottom: 20px;\n        }\n        .input-group {\n            margin-bottom: 15px;\n            text-align: left;\n        }\n        .input-group label {\n            display: block;\n            font-size: 14px;\n            color: #aaa;\n        }\n        .input-group input {\n            width: 95%;\n            padding: 10px;\n            border: none;\n            background: rgba(255, 255, 255, 0.1);\n            border-radius: 8px;\n            color: white;\n            font-size: 14px;\n        }\n        .submit-btn {\n            display: block;\n            width: 100%;\n            padding: 10px;\n            background: #1f2d52;\n            color: white;\n            text-align: center;\n            border-radius: 25px;\n            text-decoration: none;\n            font-weight: bold;\n            margin-top: 10px;\n            cursor: pointer;\n            border: none;\n        }\n        .submit-btn:hover {\n            background: #293b6a;\n        }\n        .footer {\n            margin-top: 10px;\n            font-size: 14px;\n            display: flex;\n            justify-content: space-between;\n            color: white;\n        }\n        .footer a {\n            text-decoration: none;\n            color: #4a90e2;\n        }\n    ",
          }}
        />
        <div className="container">
          <h2>LOGIN</h2>
          <div className="input-group">
            <label>USERNAME</label>
            <input type="text" placeholder="Enter Username" />
          </div>
          <div className="input-group">
            <label>PASSWORD</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          <Link to="/about">
          
            <button className="submit-btn">LOGIN</button>
          </Link>
          <div className="footer">
            <a href="#">REGISTER</a>
            <a href="#">FORGOT PASSWORD</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
