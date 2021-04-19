defmodule ApiWeb.Plugs.AuthenticationRequired do
  import Plug.Conn

  alias Api.Repo
  alias Api.Accounts
  alias Api.Accounts.User

  def init(default) do
    default
  end

  def call(conn, _default) do
    session_token = get_session(conn, "session_token")
    session_expire = conn.assigns.current_time
    user_id = get_session(conn, "user_id")
    cond do
      session_token === nil || user_id === nil ->
        resp = Accounts.get_error_resp(401, "Bad Authorization Credentials", %{authenticated: false})
        send_resp(conn, 200, Poison.encode!(resp))
      true ->
        user = Repo.get(User, user_id)
        cond do
          user === nil ->
            resp = Accounts.get_error_resp(401, "Bad Authorization Credentials", %{authenticated: false})
            send_resp(conn, 200, Poison.encode!(resp))
          true ->
            case compare_session_token(user, session_token, session_expire) do
              :ok -> assign(conn, :current_user, user)
              :error ->
                resp = Accounts.get_error_resp(401, "Bad Authorization Credentials", %{authenticated: false})
                send_resp(conn, 200, Poison.encode!(resp))
            end
        end
    end
  end

  defp compare_session_token(user, session_token, session_expire) do
    db_session_token = user.session_token
    db_session_expire = user.session_expire
    cond do
      db_session_expire === nil || db_session_token === nil -> :error
      db_session_token !== session_token -> :error
      DateTime.diff(session_expire, db_session_expire) > 3600 -> :error
      true -> :ok
    end
  end
end
