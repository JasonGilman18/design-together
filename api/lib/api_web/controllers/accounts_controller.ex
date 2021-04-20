defmodule ApiWeb.AccountsController do
  use ApiWeb, :controller

  alias Api.Accounts

  def login(conn, _params) do
    token_id = conn.body_params["token_id"]
    case Accounts.login_user(token_id) do
      {:ok, id, session_token} ->
        conn
        |> put_session("session_token", session_token)
        |> put_session("user_id", id)
        |> send_resp(200, Poison.encode!(Accounts.get_ok_resp(
          "User is Authenticated", %{authenticated: true}
        )))
      :error ->
        send_resp(conn, 200, Poison.encode!(Accounts.get_error_resp(
          401, "User is not authenticated", %{authenticated: false}
        )))
    end
  end

  def logout(conn, _params) do
    current_user = conn.assigns.current_user
    case Accounts.logout_user(current_user) do
      :ok ->
        conn
        |> clear_session
        |> send_resp(200, Poison.encode!(Accounts.get_ok_resp(
          "Successfully logged out", %{authenticated: false}
        )))
      :error ->
        send_resp(conn, 200, Poison.encode!(Accounts.get_error_resp(
          500, "Unsuccessfully logged out", %{authenticated: true}
        )))
    end
  end

  def check_authenticated(conn, _params) do
    send_resp(conn, 200, Poison.encode!(Accounts.get_ok_resp(
      "User is authenticated", %{authenticated: true}
    )))
  end

end
