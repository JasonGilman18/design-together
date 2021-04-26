defmodule ApiWeb.DocumentChannel do
  use Phoenix.Channel

  def join("document:" <> _document_id, _message, socket) do
    {:ok, socket}
  end

  def handle_in("new_rectangle", %{}, socket) do
    broadcast!(socket, "new_rectangle", %{})
    {:noreply, socket}
  end

end
