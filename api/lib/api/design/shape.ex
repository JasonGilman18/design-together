defmodule Api.Design.Shape do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:document_id, :height, :width, :position_x, :position_y]}

  schema "shapes" do
    field :height, :integer
    field :width, :integer
    field :position_x, :integer
    field :position_y, :integer
    field :document_id, :id

    timestamps()
  end

  @doc false
  def changeset(shape, attrs) do
    shape
    |> cast(attrs, [:height, :width, :position_x, :position_y, :document_id])
    |> validate_required([:height, :width, :position_x, :position_y, :document_id])
  end
end
