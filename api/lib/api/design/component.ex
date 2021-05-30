defmodule Api.Design.Component do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:parent_id, :document_id, :height, :width, :position_x, :position_y, :filled, :rounded]}

  schema "components" do
    field :parent_id, :integer
    field :height, :integer
    field :width, :integer
    field :position_x, :integer
    field :position_y, :integer
    field :filled, :boolean
    field :rounded, :integer
    field :document_id, :id

    timestamps()
  end

  @doc false
  def changeset(component, attrs) do
    component
    |> cast(attrs, [:parent_id, :height, :width, :position_x, :position_y, :filled, :rounded, :document_id])
    |> validate_required([:height, :width, :position_x, :position_y, :filled, :rounded, :document_id])
  end
end
