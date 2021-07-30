defmodule ApiWeb.DesignChannel do
  use Phoenix.Channel

  alias Api.Design

  def join("document:" <> document_id, _message, socket) do
    current_member = socket.assigns.current_member
    if current_member.document_id === String.to_integer(document_id) do
      {:ok, socket, }
    else
      {:error, "Document not verified"}
    end
  end

  def handle_in("sync", _payload, socket) do
    components = Design.list_components()
    {:reply, {:ok, components}, socket}
  end

  def handle_in("new_component", component, socket) do
    case Design.create_component(component) do
      {:ok, component} ->
        broadcast!(socket, "new_component", %{
          id: component.id,
          document_id: component.document_id,
          parent_id: component.parent_id,
          type: component.type
        })
        {:noreply, socket}
      {:error, _errors} -> {:noreply, socket}
    end
  end

  def handle_in("update_component", component, socket) do
    updateComponent = Design.get_component!(component["id"])
    incomingData = %{
      height: component["style"]["height"],
      width: component["style"]["width"],
      position_x: component["style"]["position_x"],
      position_y: component["style"]["position_y"],
      rounded: component["style"]["rounded"],
      align_horizontal: component["style"]["align_horizontal"],
      align_vertical: component["style"]["align_vertical"],
      margin_top: component["style"]["margin_top"],
      margin_right: component["style"]["margin_right"],
      margin_bottom: component["style"]["margin_bottom"],
      margin_left: component["style"]["margin_left"],
      padding_top: component["style"]["padding_top"],
      padding_right: component["style"]["padding_right"],
      padding_bottom: component["style"]["padding_bottom"],
      padding_left: component["style"]["padding_left"],
      background: component["style"]["background"],
      border: component["style"]["border"],
      text: component["style"]["text"],
      text_size: component["style"]["text_size"],
      text_bold: component["style"]["text_bold"]
    }
    case Design.compare_components(updateComponent, incomingData) do
      :different ->
        case Design.update_component(updateComponent, incomingData)
        do
          {:ok, component} ->
            broadcast_from!(socket, "update_component", %{
              id: component.id,
              document_id: component.document_id,
              type: component.type,
              node: %{
                parent: nil,
                children: []
              },
              style: %{
                height: component.height,
                width: component.width,
                position_x: component.position_x,
                position_y: component.position_y,
                rounded: component.rounded,
                align_horizontal: component.align_horizontal,
                align_vertical: component.align_vertical,
                margin_top: component.margin_top,
                margin_right: component.margin_right,
                margin_bottom: component.margin_bottom,
                margin_left: component.margin_left,
                padding_top: component.padding_top,
                padding_right: component.padding_right,
                padding_bottom: component.padding_bottom,
                padding_left: component.padding_left,
                background: component.background,
                border: component.border,
                text: component.text,
                text_size: component.text_size,
                text_bold: component.text_bold
              }
            })
            {:noreply, socket}
          {:error, _errors} -> {:noreply, socket}
        end
      :same -> {:noreply, socket}
    end
  end

end
