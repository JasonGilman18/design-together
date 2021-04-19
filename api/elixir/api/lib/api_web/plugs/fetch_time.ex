defmodule ApiWeb.Plugs.FetchTime do
  import Plug.Conn

  def init(default) do
    default
  end

  def call(conn, _default) do
    current_time_utc = DateTime.utc_now()
    conn
    |> assign(:current_time, current_time_utc)
  end
end
