defmodule Api.Design.Component do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:parent_id, :document_id, :height, :width, :position_x,
    :position_y, :filled, :rounded, :align_horizontal, :align_vertical]}

  schema "components" do
    field :parent_id, :integer
    field :height, :integer
    field :width, :integer
    field :position_x, :integer
    field :position_y, :integer
    field :filled, :boolean
    field :rounded, :integer
    field :align_horizontal, :string
    field :align_vertical, :string
    field :document_id, :id

    timestamps()
  end

  @doc false
  def changeset(component, attrs) do
    component
    |> cast(attrs, [:parent_id, :height, :width, :position_x, :position_y, :filled, :rounded,
      :align_horizontal, :align_vertical, :document_id])
    |> validate_required([:height, :width, :position_x, :position_y, :filled, :rounded, :document_id])
  end
end
