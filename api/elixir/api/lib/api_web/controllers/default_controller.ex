defmodule ApiWeb.DefaultController do
  use ApiWeb, :controller

  def index(conn, _params) do
    text conn, "API reached"
  end
end
