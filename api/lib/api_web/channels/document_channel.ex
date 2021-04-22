defmodule ApiWeb.DocumentChannel do
  use Phoenix.Channel

  def join("document:" <> document_id, _message, socket) do
    {:ok, socket}
  end

end
