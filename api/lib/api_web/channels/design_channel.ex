defmodule ApiWeb.DesignChannel do
  use Phoenix.Channel

  alias Api.Design

  def join("document:" <> document_id, _message, socket) do
    current_member = socket.assigns.current_member
    if current_member.document_id === String.to_integer(document_id) do
      {:ok, socket}
    else
      {:error, "Document not verified"}
    end
  end

  def handle_in("new_shape", shape, socket) do
    case Design.create_shape(shape) do
      {:ok, shape} ->
        broadcast!(socket, "new_shape", %{
          id: shape.id,
          document_id: shape.document_id,
          height: shape.height,
          width: shape.width,
          x_position: shape.x_position,
          y_position: shape.y_position})
        {:noreply, socket}
      {:error, _errors} -> {:noreply, socket}
    end
  end

  def handle_in("shape_movement", %{xMovement: xMovement, yMovement: yMovement}, socket) do
    broadcast!(socket, "shape_movement", %{xMovement: xMovement, yMovement: yMovement})
    {:noreply, socket}
  end

  def handle_in("shape_resize", %{height: height, width: width}, socket) do
    broadcast!(socket, "shape_resize", %{height: height, width: width})
    {:noreply, socket}
  end

end
