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

  def handle_in("new_component", component, socket) do
    case Design.create_component(component) do
      {:ok, component} ->
        broadcast!(socket, "new_component", %{
          id: component.id,
          document_id: component.document_id,
          parent_id: component.parent_id,
          height: component.height,
          width: component.width,
          position_x: component.position_x,
          position_y: component.position_y,
          filled: component.filled,
          rounded: component.rounded})
        {:noreply, socket}
      {:error, _errors} -> {:noreply, socket}
    end
  end

  def handle_in("update_component", component, socket) do
    updateComponent = Design.get_component!(component["id"])
    case Design.update_component(updateComponent, %{
      height: component["height"],
      width: component["width"],
      position_x: component["position_x"],
      position_y: component["position_y"],
      filled: component["filled"],
      rounded: component["rounded"]})
    do
      {:ok, component} ->
        broadcast_from!(socket, "update_component", %{
          id: component.id,
          document_id: component.document_id,
          node: %{
            parent: nil,
            children: []
          },
          style: %{
            height: component.height,
            width: component.width,
            position_x: component.position_x,
            position_y: component.position_y,
            filled: component.filled,
            rounded: component.rounded
          }
        })
        {:noreply, socket}
      {:error, _errors} -> {:noreply, socket}
    end
  end

end
