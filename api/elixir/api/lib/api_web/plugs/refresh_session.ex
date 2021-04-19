defmodule ApiWeb.Plugs.RefreshSession do
  import Plug.Conn
  alias Api.Accounts

  def init(default) do
    default
  end

  def call(conn, _default) do
    new_expire = DateTime.utc_now()
    new_token = Ecto.UUID.generate()
    current_user = conn.assigns.current_user
    case Accounts.update_user(current_user, %{session_token: new_token, session_expire: new_expire}) do

      {:ok, updated_user} -> put_session(conn, "session_token", updated_user.session_token)
      {:error, _changeset} ->
        resp = Accounts.get_error_resp(500, "Session could not be refreshed.", %{authenticated: false})
        send_resp(conn, 200, Poison.encode!(resp))
    end
  end
end
