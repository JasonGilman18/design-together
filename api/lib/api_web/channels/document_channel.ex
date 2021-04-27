defmodule ApiWeb.DocumentChannel do
  use Phoenix.Channel

  def join("document:" <> document_id, _message, socket) do
    current_member = socket.assigns.current_member
    if current_member.document_id === String.to_integer(document_id) do
      {:ok, socket}
    else
      {:error, "Document not verified"}
    end
  end

  def handle_in("new_rectangle", %{}, socket) do
    broadcast!(socket, "new_rectangle", %{})
    {:noreply, socket}
  end

end
