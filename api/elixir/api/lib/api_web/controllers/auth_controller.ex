defmodule ApiWeb.AuthController do
  use ApiWeb, :controller

  alias Api.Accounts

  def login(conn, _params) do
    token_id = conn.body_params["token_id"]
    case Accounts.login_user(token_id) do
      {:ok, id, session_token} ->
        conn
        |> put_session("session_token", session_token)
        |> put_session("user_id", id)
        |> put_status(200)
        |> json(%{authenticated: true, message: "User is authenticated"})
      :error ->
        conn
        |> put_status(401)
        |> json(%{authenticated: false, message: "User is not authenticated"})
    end
  end

  def logout(conn, _params) do
    conn
    |> clear_session
    |> put_status(200)
    |> json(%{authenticated: false})
  end

  def check_authenticated(conn, _params) do

    #need get user token from table and compare to cookie

    if get_session(conn, "session_token") === nil do
      conn
      |> put_status(401)
      |> json(%{authenticated: false})
    else
      conn
      |> put_status(200)
      |> json(%{authenticated: true})
    end
  end

end
